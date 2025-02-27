"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRoomSchema, JoinRoomSchema } from "@repo/common/types";
import Button from "@repo/ui/button";
import Input from "@repo/ui/input";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Logo from "./logo";
import { Redirect } from "../hooks/redirect";

type CreateRoomType = z.infer<typeof CreateRoomSchema>;
type JoinRoomType = z.infer<typeof JoinRoomSchema>;

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

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
  } = useForm<CreateRoomType | JoinRoomType>({
    resolver: zodResolver(isCreate ? CreateRoomSchema : JoinRoomSchema),
    mode: "onChange",
  });

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshResponse = await axios.post<RefreshTokenResponse>(
        `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/auth/refresh`,
        {
          refreshToken: localStorage.getItem("refresh_token"),
        }
      );

      if (refreshResponse.status === 200) {
        localStorage.setItem("access_token", refreshResponse.data.accessToken);
        localStorage.setItem(
          "refresh_token",
          refreshResponse.data.refreshToken
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  };

  const onSubmit = async (data: CreateRoomType | JoinRoomType) => {
    try {
      if (isCreate) {
        const token = localStorage.getItem("access_token");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_HTTP_URL}/api/v1/room`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          reset();
          router.push(`/canvas/${response.data.response}`);
        }
      } else {
        router.push(`/canvas/${(data as JoinRoomType).name}`);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        const refreshed = await refreshToken();
        if (refreshed) {
          await onSubmit(data); // Retry with new token
        } else {
          console.error("Authentication failed. Please log in again.");
          router.push("/login"); // Redirect to login if refresh fails
        }
      } else {
        console.error("Error:", axiosError);
        reset();
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 w-screen h-screen flex items-center justify-center">
      <Redirect />
      <div className="p-9 m-2 bg-gradient-to-br from-neutral-950 to-neutral-900 border border-amethyst-500/45 rounded-xl w-full max-w-md">
        <div className="flex flex-col items-start">
          <Logo />
          <h1 className="text-2xl font-semibold text-amethyst-200">
            {isCreate ? "Create" : "Join"} Room
          </h1>
          <p className="text-gray-400 text-center text-sm mb-6">
            {isCreate
              ? "Create room to start drawing diagrams!"
              : "Join a room to collaborate and draw!"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("name")}
            placeholder="Enter Room name"
            type="text"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message?.toString()}
            </p>
          )}
          <Button disabled={!isValid || isSubmitting} className="w-full">
            {isCreate ? "Create" : "Join"}
          </Button>

          <p className="text-gray-400">
            {isCreate ? (
              <>
                <span>If you want to join a room, please click here. </span>
                <Link
                  href="/room/join"
                  className="font-semibold text-amethyst-300 hover:text-royal-blue-400 transition-colors"
                >
                  Join
                </Link>
              </>
            ) : (
              <>
                <span>If you want to create a room, please click here. </span>
                <Link
                  href="/room/create"
                  className="font-semibold text-amethyst-300 hover:text-royal-blue-400 transition-colors"
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
