import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import useColumnDrop from "../hooks/useColumnDrop";
import useColumnTask from "../hooks/useColumnTask";
import { ColumnType } from "../utils/enums";
import { TaskModel } from "../utils/models";
import Task from "./Task";

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: "gray",
  "In Progress": "blue",
  Blocked: "red",
  Completed: "green",
};

function Column({ column }: { column: ColumnType }) {
  const {
    tasks,
    addEmptyTask,
    updateTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
  } = useColumnTask(column);

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      onDelete={deleteTask}
      onUpdate={updateTask}
      onDropHover={swapTasks}
    />
  ));
  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge
          px={10}
          py={1}
          rounded="xl"
          colorScheme={ColumnColorScheme[column]}
        >
          {column}
        </Badge>
      </Heading>
      <IconButton
        size="xs"
        w="full"
        color="gray.400"
        bgColor="whiteAlpha.300"
        _hover={{ bgColor: "whiteAlpha.400" }}
        py={2}
        variant="solid"
        colorScheme="black"
        aria-label="add-task"
        icon={<AddIcon />}
        onClick={addEmptyTask}
      />
      <Stack
        ref={dropRef}
        direction={{ base: "row", md: "column" }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor="#494949"
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        alignItems="start"
        shouldWrapChildren={true}
        opacity={isOver ? 0.85 : 1}
      >
        {ColumnTasks}
      </Stack>
    </Box>
  );
}

export default Column;
