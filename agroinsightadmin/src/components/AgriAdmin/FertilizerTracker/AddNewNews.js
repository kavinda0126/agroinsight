import React, { useState } from "react";
import { Form, Button, Container, Image } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import PageTitle from "../AgriPageTitle";

const AddNewNews = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [details, setDetails] = useState("");
  const [source, setSource] = useState(""); // State for source

  const [errors, setErrors] = useState({}); // For validation errors
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Save the selected file to the state

    // Generate a preview of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set the preview URL
    };
    reader.readAsDataURL(file);
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!image) newErrors.image = "Image is required.";
    //if (!details) newErrors.details = "Details are required.";
    if (!source) newErrors.source = "Source is required.";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validation
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set the errors if any
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("newsImage", image); // Append the image file to the form data
    formData.append("details", details);
    formData.append("source", source); // Append source field

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/f&p/add-news`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Reset the form after successful submission
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      setDetails("");
      setSource(""); // Reset source field
      setErrors({}); // Reset errors

      alert("New agrochemical news added successfully");
      navigate("/agriadmin/fertilizers&pesticides?tab=agrochemicalnews");
    } catch (error) {
      console.error("There was an error adding the news!", error);
      alert("Failed to add the news");
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle
        title="Fertilizers & Pesticides"
        url="/agriadmin/fertilizers&pesticides/addnews"
      />
      <Container>
        <h3>
          <Button
            variant="dark"
            onClick={() =>
              navigate("/agriadmin/fertilizers&pesticides?tab=agrochemicalnews")
            }
            style={{ margin: "10px" }}
          >
            <BsArrowLeft /> Back
          </Button>
          Add New Agrochemical News
        </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isInvalid={!!errors.title} // Apply validation style
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isInvalid={!!errors.description} // Apply validation style
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formImage" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              isInvalid={!!errors.image} // Apply validation style
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>
            {imagePreview && (
              <div className="mt-3">
                <Image
                  src={imagePreview}
                  thumbnail
                  fluid
                  alt="Image Preview"
                  style={{
                    width: "400px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="formDetails" className="mb-3">
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              isInvalid={!!errors.details} // Apply validation style
            />
            <Form.Control.Feedback type="invalid">
              {errors.details}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formSource" className="mb-3">
            <Form.Label>Source</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              isInvalid={!!errors.source} // Apply validation style
            />
            <Form.Control.Feedback type="invalid">
              {errors.source}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Add News
          </Button>
        </Form>
      </Container>
    </main>
  );
};

export default AddNewNews;
