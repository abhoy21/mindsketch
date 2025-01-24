"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRoomSchema, JoinRoomSchema } from "@repo/common/types";
import Button from "@repo/ui/button";
import Input from "@repo/ui/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HTTP_BACKEND_URL } from "../config";
import Logo from "./logo";

type createRoomType = z.infer<typeof CreateRoomSchema>;
type joinRoomType = z.infer<typeof JoinRoomSchema>;

export default function CommonRoomPage({
  isCreate,
}: {
  isCreate: boolean;
}): React.JSX.Element {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitting },
  } = useForm<createRoomType | joinRoomType>({
    resolver: zodResolver(isCreate ? CreateRoomSchema : JoinRoomSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: createRoomType | joinRoomType) => {
    try {
      const token = localStorage.getItem("token");
      if (isCreate) {
        const response = await axios.post(
          `${HTTP_BACKEND_URL}/api/v1/room`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.status === 200) {
          reset();
          router.push(`/canvas/${response.data.response}`);
        } else {
          await axios;
        }
      } else {
        router.push(`/canvas/${data.name}`);
      }
    } catch (error) {
      console.log(error);
      reset();
    }
  };
  return (
    <div className='bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 w-screen h-screen flex items-center justify-center'>
      <div className='p-9 m-2 bg-gradient-to-br from-neutral-950 to-neutral-900 border border-amethyst-500/45 rounded-xl w-full max-w-md'>
        <div className='flex flex-col items-start'>
          <Logo />
          <h1 className='text-2xl font-semibold text-amethyst-200'>
            {isCreate ? "Create" : "Join"} Room
          </h1>
          <p className='text-gray-400 text-center text-sm mb-6'>
            {isCreate
              ? " Create room to start drawing diagrams!"
              : "Join a room to collaborate and draw!"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <Input
            {...register("name")}
            placeholder='Enter Room name'
            type='text'
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.name.message?.toString()}
            </p>
          )}
          <Button disabled={!isValid || isSubmitting} className='w-full'>
            {isCreate ? "Create" : "Join"}
          </Button>

          <p className='text-gray-400'>
            {isCreate ? (
              <>
                <span> If you want to join a room, please click here. </span>
                <Link
                  href='/room/join'
                  className='font-semibold text-amethyst-300 hover:text-royal-blue-400 transition-colors'
                >
                  Join
                </Link>
              </>
            ) : (
              <>
                <span> If you want to create a room, please click here. </span>
                <Link
                  href='/room/create'
                  className='font-semibold text-amethyst-300 hover:text-royal-blue-400 transition-colors'
                >
                  Create
                </Link>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
