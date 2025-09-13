import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, RTE, Select } from "../index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/conf";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [imagePreview, setImagePreview] = useState(
    post?.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : ""
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const slugTransformations = useCallback((value) => {
    if (typeof value === "string") {
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d]+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransformations(value.title), {
          shouldValidate: true,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransformations, setValue]);

  // Watch file input and update preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localPreview = URL.createObjectURL(file);
      setImagePreview(localPreview);
    } else if (post?.featuredImage) {
      setImagePreview(appwriteService.getFilePreview(post.featuredImage));
    } else {
      setImagePreview("");
    }
  };

  const submit = async (data) => {
    if (post) {
      const file = data.image?.[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // -------- CREATE flow ----------
      const file = data.image?.[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        data.featuredImage = file.$id;

        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap my-20">
      {/* Left Section */}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransformations(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Section */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
          onChange={handleFileChange}
        />

        {imagePreview && (
          <div className="w-full mb-4">
            <img src={imagePreview} alt={getValues("title")} content={"content"} className="rounded-lg" />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status: "
          className="mb-4 ml-5"
          {...register("status", { required: true })}
        />

        <Button type="submit" className="bg-green-600 hover:bg-green-600 hover:text-white">
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
