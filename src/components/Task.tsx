import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import useTaskDragAndDrop from "../hooks/useTaskDragAndDrop";
import { TaskModel } from "../utils/models";
import { AutoResizeTextarea } from "./AutoResizeTextArea";

type TaskProps = {
  index: number;
  task: TaskModel;
  onUpdate: (id: TaskModel["id"], updateTask: TaskModel) => void;
  onDelete: (id: TaskModel["id"]) => void;
  onDropHover: (i: number, j: number) => void;
};

export default function Task({
  index,
  task,
  onUpdate: handleUpdate,
  onDelete: handleDelete,
  onDropHover: handleDropHover,
}: TaskProps) {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({
    task,
    index,
    handleDropHover,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    handleUpdate(task.id, { ...task, title: newTitle });
  };

  const handleDeleteClick = () => {
    handleDelete(task.id);
  };

  return (
    <Box
      ref={ref}
      as="div"
      role="group"
      position="relative"
      rounded="lg"
      w={200}
      pl={3}
      pr={7}
      pt={3}
      pb={1}
      boxShadow="xl"
      cursor="grab"
      bgColor="#3c3c3c"
      flexGrow={0}
      flexShrink={0}
      opacity={isDragging ? 0.5 : 1}
    >
      <IconButton
        position="absolute"
        top={0}
        right={0}
        zIndex={100}
        aria-label="delete-task"
        size="md"
        colorScheme="solid"
        color={"#3c3c3c"}
        icon={<DeleteIcon color={"red.300"} />}
        opacity={0}
        _groupHover={{
          opacity: 1,
        }}
        onClick={handleDeleteClick}
      />
      <AutoResizeTextarea
        value={task.title}
        fontWeight="semibold"
        cursor="inherit"
        border="none"
        p={0}
        resize="none"
        minH={70}
        maxH={200}
        focusBorderColor="none"
        color="white"
        onChange={handleTitleChange}
      />
    </Box>
  );
}
