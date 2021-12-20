import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import { Task } from "../../models/Task";
import ListItem from "./ListItem";
import * as SQLite from "expo-sqlite";
// @ts-ignore
import fabIcon from "../../../assets/images/fab.png";
import { dateToDatabaseString, stringToDate } from "../../shared/DateUtil";

function openDatabase(): SQLite.WebSQLDatabase {
  if (Platform.OS === "web") {
    return {
      // @ts-ignore
      transation: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  } else {
    return SQLite.openDatabase("db.db");
  }
}

const db = openDatabase();

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists 
          items (id integer primary key not null, done int, 
            value text, created_date text, 
              completed_date text);`,
        [],
        (_, result) => {
          console.log("RESULT CREATE TABLE: ", JSON.stringify(result));
          getItems();
        },
        (_, error) => {
          console.log("ERROR CREATE TABLE: ", JSON.stringify(error));
          return false;
        }
      );
    });
  }, []);

  const getItems = () => {
    console.log("getItems");
    db.transaction((tx) => {
      tx.executeSql(
        "select * from items where done = 0",
        [],
        (_, resultSet) => {
          console.log(JSON.stringify(resultSet.rows._array));

          const notCompletedTasks = resultSet.rows._array.map((item: any) => {
            const task = new Task(
              item.id,
              item.done === 1,
              item.value,
              stringToDate(item.created_date),
              item.completed_date
                ? stringToDate(item.completed_date)
                : undefined
            );
            return task;
          });

          tx.executeSql(
            "select * from items where done = 1 order by completed_date desc",
            [],
            (_, resultSet) => {
              console.log(JSON.stringify(resultSet.rows._array));

              const completedTasks = resultSet.rows._array.map((item: any) => {
                const task = new Task(
                  item.id,
                  item.done === 1,
                  item.value,
                  stringToDate(item.created_date),
                  item.completed_date
                    ? stringToDate(item.completed_date)
                    : undefined
                );
                return task;
              });

              setTasks(notCompletedTasks.concat(completedTasks));
            }
          );
        }
      );
    });
  };

  const addItem = () => {
    // adicionar a tarefa
    const description = modalText.trim();
    if (description.length === 0) {
      // mensagem de erro
      console.log("Texto é vazio");
    } else {
      const dateNow = dateToDatabaseString(new Date());
      console.log("dateNow: ", dateNow);
      db.transaction(
        (tx) => {
          console.log("Início do transaction");
          tx.executeSql(
            "insert into items (done, value, created_date, completed_date) values (0, ?, ?, ?)",
            [description, dateNow, ""]
          );
          // tx.executeSql("select * from items", [], (_, { rows }) =>
          //   console.log(JSON.stringify(rows))
          // );
          getItems();
        },
        undefined,
        // @ts-ignore
        forceUpdate
      );
    }
    // fechar o modal
    setModalVisible(false);
    // limpar o campo de texto
    setModalText("");
  };

  const updateItem = (task: Task, checked: boolean) => {
    db.transaction((tx) => {
      tx.executeSql(
        "update items set done = ?, completed_date = ? where id = ?",
        [checked ? 1 : 0, dateToDatabaseString(new Date()), task.id || 0]
      );
      getItems();
    });
  };
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <ListItem task={item} onChange={updateItem} />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Image style={styles.fabImg} source={fabIcon} />
      </TouchableOpacity>
      <Modal
        style={{ marginTop: 22 }}
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <Text style={styles.modalTitle}>Nova Tarefa</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Digite a descrição da tarefa"
              value={modalText}
              onChangeText={(text) => setModalText(text)}
            />
            <TouchableOpacity style={styles.modalButtonAdd} onPress={addItem}>
              <Text style={styles.modalButtonAddTitle}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonCancelTitle}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const fabAlign = 16;
const fabSize = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    right: fabAlign,
    bottom: fabAlign,
  },
  fabImg: {
    width: fabSize,
    height: fabSize,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  content: {
    margin: 20,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalInput: {
    borderColor: "#939393",
    borderWidth: 1,
    borderRadius: 6,
    height: 36,
    backgroundColor: "#eee",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  modalButtonAdd: {
    backgroundColor: "#55B659",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 12,
    height: 36,
  },
  modalButtonAddTitle: { color: "#fff" },
  modalButtonCancel: {
    alignItems: "center",
    justifyContent: "center",
    height: 36,
  },
  modalButtonCancelTitle: {
    color: "#55B659",
  },
});
