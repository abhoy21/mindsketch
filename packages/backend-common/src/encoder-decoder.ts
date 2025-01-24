interface DataProps {
  id: number;
  slug: string;
}

export const encode = (data: DataProps): string => {
  const { id, slug } = data;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const stringId = id.toString();
  const random = Array.from(
    { length: 6 },
    () => characters[Math.floor(Math.random() * characters.length)],
  ).join("");
  return `${stringId}/${random}/${slug}`;
};

export const decode = (data: string): DataProps => {
  const [id, random, slug] = data.split("/");
  const integerId = parseInt(id as string);
  return {
    id: integerId as number,
    slug: slug as string,
  };
};
