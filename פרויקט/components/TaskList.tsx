// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   FlatList,
//   Pressable,
//   StyleSheet,
//   Text,
//   Alert,
//   Switch,
//   KeyboardAvoidingView,
//   Platform,
//   Dimensions,
//   ActivityIndicator,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import TaskItem from './TaskItem';
// import AddTaskModal from './AddTaskModal';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const TaskList = () => {
//   const [tasks, setTasks] = useState<{ id: string; title: string; completed: boolean }[]>([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editingTask, setEditingTask] = useState<{ id: string; title: string } | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);

//   const { width, height } = Dimensions.get('window'); // שימוש ב-Dimensions

//   useEffect(() => {
//     const loadTasks = async () => {
//       try {
//         const storedTasks = await AsyncStorage.getItem('tasks');
//         if (storedTasks) {
//           setTasks(JSON.parse(storedTasks));
//         }
//       } catch (error) {
//         Alert.alert('Error', 'Failed to load tasks.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadTasks();
//   }, []);

//   const addTask = async (title: string) => {
//     const newTask = { id: Date.now().toString(), title, completed: false };
//     const newTasks = [...tasks, newTask];
//     setTasks(newTasks);
//     setModalVisible(false);
//     await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
//   };

//   const editTask = async (id: string, newTitle: string) => {
//     const newTasks = tasks.map((task) =>
//       task.id === id ? { ...task, title: newTitle } : task
//     );
//     setTasks(newTasks);
//     setEditingTask(null);
//     await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
//   };

//   const deleteTask = async (id: string) => {
//     const newTasks = tasks.filter((task) => task.id !== id);
//     setTasks(newTasks);
//     await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
//   };

//   const toggleTaskCompletion = async (id: string) => {
//     const newTasks = tasks.map((task) =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     );
//     setTasks(newTasks);
//     await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#009688" />
//       </View>
//     );
//   }

//   return (
//     <KeyboardAvoidingView
//       style={[styles.container, darkMode && styles.darkContainer]}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <View style={styles.header}>
//         <Switch
//           value={darkMode}
//           onValueChange={setDarkMode}
//           thumbColor={darkMode ? '#009688' : '#f4f4f4'}
//           trackColor={{ false: '#ccc', true: '#004d40' }}
//         />
//       </View>
//       <FlatList
//         data={tasks}
//         renderItem={({ item }) => (
//           <TaskItem
//             task={item}
//             onDelete={deleteTask}
//             onToggleCompletion={toggleTaskCompletion}
//             onEdit={(task) => setEditingTask(task)}
//           />
//         )}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContainer}
//      />
//       <Pressable
//         style={styles.addButton}
//         onPress={() => setModalVisible(true)}
//       >
//         <Icon name="plus" size={20} color="#ffffff" />
//       </Pressable>
//       <AddTaskModal
//         visible={modalVisible || editingTask !== null}
//         onClose={() => {
//           setModalVisible(false);
//           setEditingTask(null);
//         }}
//         onAddTask={addTask}
//         taskToEdit={editingTask}
//         onEditTask={editTask}
//       />
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f4f4f4',
//   },
//   darkContainer: {
//     backgroundColor: '#333',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   footerText: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#999',
//     marginTop: 20,
//   },
//   addButton: {
//     backgroundColor: '#009688',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   listContainer: {
//     paddingBottom: 80,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default TaskList;import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import TaskItem from './TaskItem';
import AddTaskModal from './AddTaskModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState<{ id: string; title: string; completed: boolean }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<{ id: string; title: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const { width, height } = Dimensions.get('window'); // שימוש ב-Dimensions

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load tasks.');
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const addTask = async (title: string) => {
    const newTask = { id: Date.now().toString(), title, completed: false };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setModalVisible(false);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const editTask = async (id: string, newTitle: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    setTasks(newTasks);
    setEditingTask(null);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const deleteTask = async (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const toggleTaskCompletion = async (id: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#009688" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, darkMode && styles.darkContainer]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? '#009688' : '#f4f4f4'}
          trackColor={{ false: '#ccc', true: '#004d40' }}
        />
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Animated.View entering={FadeInLeft}>
            <TaskItem
              task={item}
              onDelete={deleteTask}
              onToggleCompletion={toggleTaskCompletion}
              onEdit={(task) => setEditingTask(task)}
            />
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Pressable
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="plus" size={20} color="#ffffff" />
      </Pressable>
      <AddTaskModal
        visible={modalVisible || editingTask !== null}
        onClose={() => {
          setModalVisible(false);
          setEditingTask(null);
        }}
        onAddTask={addTask}
        taskToEdit={editingTask}
        onEditTask={editTask}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#009688',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  listContainer: {
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskList;