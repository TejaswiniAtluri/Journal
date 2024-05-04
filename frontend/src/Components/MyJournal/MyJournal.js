import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import getAxiosWithToken from "../util";
import { useSelector } from "react-redux";

const containerStyle = {
  backgroundColor: "beige", // Light gray background color
  padding: "20px", // Padding around the content
  borderRadius: "10px", // Rounded corners
};

const cardStyle = {
  backgroundColor: "white", // Background color for journal cards
  border: "1px solid #dee2e6", // Border color
  borderRadius: "8px", // Rounded corners
  marginBottom: "15px", // Spacing between cards
};

function MyJournal() {
  const { register, handleSubmit } = useForm();
  const { currentUser } = useSelector((state) => state.userLogin);
  const [journals, setJournals] = useState([]);
  const [fetchFlag, setFetchFlag] = useState(false);

  async function addJournal(data) {
    const axiosWithToken = getAxiosWithToken();

    data.time = new Date();

    const res = await axiosWithToken.put(
      `/user/${currentUser.username}/add-journal`,
      data
    );

    if (res.data.message === "Journal added") {
      setFetchFlag(!fetchFlag);
    }
  }

  async function deleteJournal(id) {
    const axiosWithToken = getAxiosWithToken();
    const res = await axiosWithToken.delete(
      `/user/${currentUser.username}/delete-journal/${id}`
    );

    if (res.data.message === "Journal Entry Deleted") {
      setFetchFlag(!fetchFlag);
    }
  }

  useEffect(() => {
    const axiosWithToken = getAxiosWithToken();
    const getJournals = async () => {
      const res = await axiosWithToken.get(
        `/user/${currentUser.username}/get-journals`
      );

      if (res.data.message === "All journals") {
        setJournals(res.data.payload);
      }
    };

    getJournals();
  }, [fetchFlag]);

  return (
    <div className="container" style={containerStyle}>
      <form className="w-50 mx-auto mt-3" onSubmit={handleSubmit(addJournal)}>
        <div className="input-group mb-3">
          <input
            type="text"
            placeholder="Journal..."
            className="form-control"
            {...register("content", { required: true })}
          />
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </form>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {journals.map((journal) => (
          <div className="col" key={journal.id}>
            <div className="card" style={cardStyle}>
              <div className="card-body">
                <p className="card-text">{journal.content}</p>
                <p className="card-text">
                  <small className="text-muted">{journal.time}</small>
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteJournal(journal.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyJournal;
