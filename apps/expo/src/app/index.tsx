import React, { useState } from "react";
import { Button, FlatList, ScrollView, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Plus, Trash } from "lucide-react-native";

import { api, type RouterOutputs } from "~/utils/api";
import Zod from "zod";
import { styled } from "nativewind";
import Texty from "./components/Texty";
import { cn } from "../../../../packages/utils/cn";

const TaskZod = Zod.object({
  id: Zod.number().default(() => Math.random()),
  name: Zod.string().min(3).max(100),
  important: Zod.boolean().default(false),
}).strict()

const TaskZodArray = Zod.array(TaskZod)

export type TaskForm = Zod.infer<typeof TaskZod>
export type TaskFormArray = Zod.infer<typeof TaskZodArray>

const StyledTouchableOpacity = styled(TouchableOpacity)

export type StartSessionStepProps = {
  tasks: TaskFormArray
  setTasks: (tasks: TaskFormArray) => void
  step: number
  setStep: (step: number) => void
}

const StepOne = ({ tasks, setTasks, step, setStep }: StartSessionStepProps) => {
  const theme = useColorScheme()
  const [taskName, setTaskName] = useState("")
  const [important, setImportant] = useState(false)

  const addTask = () => {
    const newTask = {
      name: taskName,
      important,
    }
    const res = TaskZod.safeParse(newTask)
    if (!res.success) {
      console.log(res.error)
      return
    }
    setTasks([...tasks, res.data])
    setTaskName("")
    setImportant(false)
  }

  console.log(theme)

  const AddTaskForm = (
    <View className="flex flex-row gap-2 mt-1">
      <TextInput
        className="p-4 bg-white dark:bg-black text-black dark:text-white rounded-xl flex-1 shadow-md"
        placeholder="Task name"
        placeholderTextColor={theme === 'dark' ? 'grey' : 'grey'}
        value={taskName}
        onChangeText={setTaskName}
      />
      <TouchableOpacity
        className="py-0 px-6 bg-black dark:bg-white rounded-xl shadow-md"
        onPress={addTask}
      >
        <Plus className="text-white dark:text-black m-auto" size={24} strokeWidth={3} />
      </TouchableOpacity>
    </View>
  )

  return (
    <View className="w-full h-full flex justify-end space-y-4">
      <View>
        <Text className="text-lg text-left font-light text-black dark:text-neutral-300">
          Welcome back! Lets get to work...
        </Text>
        <Text className="text-2xl text-left font-extrabold text-black dark:text-white">
          What do you want to get done?
        </Text>
      </View>
      <FlatList
        className="px-4 -mx-4 h-auto flex-grow-0 overflow-visible"
        contentContainerStyle={{ paddingHorizontal: 2 }}
        data={tasks}
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={(p) => (
          <View className="flex flex-row bg-white dark:bg-black rounded-xl p-4 shadow-md justify-between items-center">
            <Texty>{p.item.name}</Texty>
          </View>
        )}
        ListFooterComponent={AddTaskForm}
      />
      <View className="fixed bottom-0 left-0 flex flex-row bg-black p-4 rounded-xl justify-between">
        <TouchableOpacity
          className="bg-white/40 rounded-xl px-6 py-2"
          onPress={() => setStep(step + 1)}
        >
          <Text className="text-white text-lg font-semibold">Skip All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={tasks.length === 0}
          className={cn("bg-white rounded-xl px-6 py-2", tasks.length === 0 && "bg-white/40")}
          onPress={() => setStep(step + 1)}
        >
          <Text className={cn("text-lg font-semibold", tasks.length === 0 && 'text-white/50')}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Index = () => {
  const [step, setStep] = useState(0);
  const utils = api.useContext();

  const [tasks, setTasks] = useState<TaskFormArray>([])

  return (
    <SafeAreaView className="bg-white dark:bg-neutral-900 text-black dark:text-white" edges={['right', 'bottom', 'left']}>
      <Stack.Screen options={{ title: "Hello" }} />
      {/* Changes page title visible on the header */}
      <View className="h-full w-full flex p-4">
        <StepOne tasks={tasks} setTasks={setTasks} step={step} setStep={setStep} />
      </View>
    </SafeAreaView>
  );
};

export default Index;
