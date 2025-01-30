import { RoomCanvas } from "../../../components/room-canvas";
import { Redirect } from "../../../hooks/redirect";

export default async function CanvasPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const [roomId, rendom, roomName] = (await params).slug;
  const slug = `${roomId}/${rendom}/${roomName}`;
  console.log("Slug: ", slug);
  return (
    <>
      <Redirect />
      <RoomCanvas roomId={slug} />
    </>
  );
}
