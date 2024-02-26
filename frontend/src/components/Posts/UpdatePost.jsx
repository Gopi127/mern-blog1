import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchPost, updatePostAPI } from "../../APIServices/posts/postsAPI";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";

export default function UpdatePost() {
  //! Get the post id
  const { postId } = useParams();
  4;
  const { data } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => fetchPost(postId),
  });
  //post mutation
  const postMutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: updatePostAPI,
  });
  const formik = useFormik({
    initialValues: {
      title: data?.postFound?.title || "",
      description: data?.postFound?.description || "",
    },
    enableReinitialize: true,
    //validation
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required(" Description is required"),
    }),
    //submit
    onSubmit: (values) => {
      const postData = {
        title: values.title,
        description: values.description,
        postId: postId,
      };
      postMutation.mutate(postData);
    },
  });
  //get loading state
  const isLoading = postMutation.isPending;
  //isErr
  const isError = postMutation.isError;
  //success
  const isSuccess = postMutation.isSuccess;
  //Error
  const error = postMutation.error;

  return (
    <div>
      <h2> You are editing -- {data?.postFound?.title}</h2>
      <div>
        {isLoading && <p>Loading....</p>}
        {isSuccess && <p>Post updated successfully....</p>}
        {isError && <p>{error.message}</p>}
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title is required"
            {...formik.getFieldProps("title")}
          />
          {/* display error msg */}
          {formik.touched.title && formik.errors.title && (
            <span style={{ color: "red" }}>{formik.errors.title}</span>
          )}
          <input
            type="text"
            name="description"
            placeholder="Description is required"
            {...formik.getFieldProps("description")}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
