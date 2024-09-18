import { useState } from "react";
import {
  useGetGenresQuery,
  useCreateGenresMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
} from "../../redux/api/genreApiSlice";
import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";
const GenreManagement = () => {
  const { data: genres, refetch } = useGetGenresQuery();
  const [name, setName] = useState("");
  const [createGenre] = useCreateGenresMutation();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const [updatingName, setUpdatingName] = useState("");
  const [updateGenre] = useUpdateGenreMutation();

  const [modalVisible, setModalVisible] = useState(false);

  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Please enter a genre name");
      return;
    }
    try {
      const res = await createGenre({ name }).unwrap();

      if (res.error) {
        toast.error(res.error);
        return;
      } else {
        setName("");
        toast.success("Genre created successfully");
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create genre");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required");
      return;
    }
    try {
      const res = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();
      if (res.error) {
        toast.error(res.error);
        return;
      } else {
        toast.success("Genre updated successfully");
        setUpdatingName("");
        setSelectedGenre(null);
        setModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update genre");
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const res = await deleteGenre({ id: selectedGenre._id }).unwrap();
      if (res.error) {
        toast.error(res.error);
        return;
      } else {
        toast.success("Genre deleted successfully");
        setSelectedGenre(null);
        setModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete genre");
    }
  };

  return (
    <div className="  mx-[11vw] my-[5vw] flex flex-col ">
      <div className="p-5">
        <h1 className=" text-white text-2xl font-semibold uppercase ml-5  ">
          Manage Genres
        </h1>
        <GenreForm
          value={name}
          setValue={setName}
          onSubmit={handleCreateGenre}
        />
        <br />

        <div className="flex flex-wrap ml-2">
          {genres?.map((genre) => (
            <div key={genre._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
                  }
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default GenreManagement;
