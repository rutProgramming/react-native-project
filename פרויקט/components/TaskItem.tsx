

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskItem = ({ task, onDelete, onToggleCompletion, onEdit }) => {
  return (
    <View style={[styles.taskItem, task.completed && styles.completedTask]}>
      <TouchableOpacity onPress={() => onToggleCompletion(task.id)} style={styles.statusIcon}>
        <Icon
          name={task.completed ? 'check-circle' : 'circle-o'}
          size={24}
          color={task.completed ? '#4caf50' : '#ccc'}
        />
      </TouchableOpacity>
      <Text style={[styles.taskTitle, task.completed && styles.completed]}>
        {task.title}
      </Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => onEdit(task)} style={styles.iconButtonEdit}>
          <Icon name="edit" size={20} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.iconButtonDelete}>
          <Icon name="trash" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedTask: {
    backgroundColor: '#e0f7e9',
  },
  statusIcon: {
    marginRight: 15,
  },
  taskTitle: {
    fontSize: 18,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#787878',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButtonEdit: {
    marginLeft: 10,
    backgroundColor: '#009688',
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonDelete: {
    marginLeft: 10,
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TaskItem;