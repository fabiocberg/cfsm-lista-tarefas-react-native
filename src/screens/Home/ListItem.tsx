import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Task } from "../../models/Task";
// @ts-ignore
import checkboxOff from "../../../assets/images/checkbox_off.png";
import { dateFormatted } from "../../shared/DateUtil";
import Checkbox from "../../components/Checkbox";

interface ListItemProps {
  task: Task;
  onChange: (task: Task, checked: boolean) => void;
}

export default function ListItem(props: ListItemProps) {
  // console.log(props.task);
  return (
    <View style={styles.container}>
      <View style={styles.descriptionBox}>
        <Checkbox
          checked={props.task.completed}
          onChanged={(checked) => props.onChange(props.task, checked)}
        />
        <Text
          style={[
            styles.description,
            props.task.completed ? styles.completedTexColor : null,
          ]}
        >
          {props.task.description}
        </Text>
      </View>
      <View style={styles.line} />
      <View style={styles.datesBox}>
        <View style={styles.dateBox}>
          <Text
            style={[
              styles.dateTitle,
              props.task.completed ? styles.completedTexColor : null,
            ]}
          >
            Criado
          </Text>
          <Text
            style={[
              styles.date,
              props.task.completed ? styles.completedTexColor : null,
            ]}
          >
            {dateFormatted(props.task.createdDate)}
          </Text>
        </View>
        <View style={styles.dateBox}>
          {props.task.completedDate ? (
            <>
              <Text style={[styles.dateTitle, styles.dateTileCompleted]}>
                Finalizado
              </Text>
              <Text style={styles.date}>
                {dateFormatted(props.task.completedDate)}
              </Text>
            </>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const checkboxSize = 26;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  descriptionBox: {
    flexDirection: "row",
  },
  description: {
    paddingLeft: 10,
    flex: 1,
  },
  completedTexColor: {
    color: "#A8A8A8",
  },
  line: {
    height: 1,
    backgroundColor: "#C9C9C9",
    marginVertical: 8,
  },
  datesBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateBox: {},
  dateTitle: {
    fontWeight: "bold",
  },
  dateTileCompleted: {
    textAlign: "right",
  },
  date: {
    marginTop: 8,
  },
});
