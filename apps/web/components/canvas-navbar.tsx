import { SelectedTool } from "@repo/common/types";
import Button from "@repo/ui/button";

export default function CanvasNavbar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: SelectedTool;
  setSelectedTool: (s: SelectedTool) => void;
}): React.JSX.Element {
  return (
    <div className="flex space-x-2 items-center justify-center m-1">
      {/* Pointer */}
      <Button
        id="pointer"
        variant="ghost"
        size="icon"
        onClick={() => setSelectedTool(SelectedTool.Pointer)}
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          fill="#a7a7ac"
          className={`${selectedTool === "Pointer" ? "bg-gradient-to-br from-amethyst-500/75 to-royal-blue-500/75 text-white" : ""} hover:bg-[#31303b]  hover:scale-105 transition-all duration-300 ease-in-out rounded-md p-2`}
          viewBox="0 0 1800 1800"
        >
          <g fill="#a7a7ac">
            <path d="m3.589 44.981 722.935 1734.396a31.666 31.666 0 0 0 29.212 19.473c.534 0 1.064-.017 1.603-.044a31.651 31.651 0 0 0 28.703-22.431l230.227-760.125 760.101-230.213a31.647 31.647 0 0 0 22.437-28.699 31.65 31.65 0 0 0-19.434-30.809L44.989 3.585C33.14-1.343 19.496 1.349 10.425 10.421a31.662 31.662 0 0 0-6.836 34.56zm88.027 46.625L1673.59 751.021 981.705 960.576a31.65 31.65 0 0 0-21.116 21.115l-209.565 691.907L91.616 91.606z" />
            <path d="M699.044 1270.004a31.545 31.545 0 0 1-12.166 2.447c-12.396 0-24.165-7.33-29.229-19.483L425.565 696.183c-6.721-16.138.905-34.669 17.041-41.397 16.14-6.723 34.669.905 41.395 17.039l232.085 556.785c6.72 16.136-.906 34.673-17.042 41.394z" />
          </g>
        </svg>
      </Button>
      {/* Rectangle */}
      <Button
        id="rectangle"
        variant="ghost"
        size="icon"
        onClick={() => setSelectedTool(SelectedTool.Rectangle)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin"
          viewBox="-2 -2 24 24"
          fill="#a7a7ac"
          className={`${selectedTool === "Rectangle" ? "bg-gradient-to-br from-amethyst-500/75 to-royal-blue-500/75 text-white" : ""} hover:bg-[#31303b]  hover:scale-105 transition-all duration-300 ease-in-out rounded-md p-2`}
        >
          <path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" />
        </svg>
      </Button>
      {/* Ellipse */}
      <Button
        id="circle"
        variant="ghost"
        size="icon"
        onClick={() => setSelectedTool(SelectedTool.Ellipse)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className={`${selectedTool === "Ellipse" ? "bg-gradient-to-br from-amethyst-500/75 to-royal-blue-500/75 text-white" : ""} hover:bg-[#31303b]  hover:scale-105 transition-all duration-300 ease-in-out rounded-md p-2`}
        >
          <circle
            cx={16}
            cy={16}
            r={11}
            style={{
              fill: "none",
              stroke: "#a7a7ac",
              strokeWidth: 2,
              strokeMiterlimit: 10,
            }}
          />
        </svg>
      </Button>
      {/* Diamond */}
      <Button
        id="diamond"
        variant="ghost"
        size="icon"
        onClick={() => setSelectedTool(SelectedTool.Diamond)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#a7a7ac"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          className={`${selectedTool === "Diamond" ? "bg-gradient-to-br from-amethyst-500/75 to-royal-blue-500/75 text-white" : ""} hover:bg-[#31303b] hover:scale-105 transition-all duration-300 ease-in-out rounded-md p-2`}
        >
          <path d="m20 10.35-5.78-7.41A3.06 3.06 0 0 0 9.75 3L4 10.35A3.05 3.05 0 0 0 3.51 12 3.09 3.09 0 0 0 4 13.58l.06.07 5.74 7.41A3 3 0 0 0 12 22a3.06 3.06 0 0 0 2.26-1L20 13.65a3 3 0 0 0-.06-3.3Zm-1.57 2.14-5.67 7.22a1.11 1.11 0 0 1-1.42.07l-5.69-7.31a1 1 0 0 1-.14-.47 1.11 1.11 0 0 1 .1-.45l5.67-7.22a1.11 1.11 0 0 1 1.42-.07l5.63 7.28a1 1 0 0 1 .16.54 1.11 1.11 0 0 1-.1.41Z" />
        </svg>
      </Button>
      {/* Arrow */}
      <Button
        id="arrow"
        variant="ghost"
        size="icon"
        onClick={() => setSelectedTool(SelectedTool.Arrow)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#a7a7ac"
          viewBox="0 0 24 24"
          className={`${selectedTool === "Arrow" ? "bg-gradient-to-br from-amethyst-500/75 to-royal-blue-500/75 text-white" : ""}  hover:bg-[#31303b] hover:scale-105 transition-all duration-300 ease-in-out rounded-md p-2`}
        >
          <path d="M3.293 20.707a1 1 0 0 1 0-1.414L17.586 5H12a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V6.414L4.707 20.707a1 1 0 0 1-1.414 0Z" />
        </svg>
      </Button>
      {/* Line */}
      <Button
        id="line"
        variant="ghost"
        size="icon"
        onClick={() => setSelectedTool(SelectedTool.Line)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          viewBox="0 0 100 100"
          fill="#a7a7ac"
          className={`${selectedTool === "Line" ? "bg-gradient-to-br from-amethyst-500/75 to-royal-blue-500/75 text-white" : ""} hover:bg-[#31303b] hover:scale-105 transition-all duration-300 ease-in-out rounded-md p-2`}
        >
          <path d="M26 50.5a2 2 0 0 0 2 2h44a2 2 0 0 0 0-4H28a2 2 0 0 0-2 2z" />
        </svg>
      </Button>
      {/* Text */}
      <Button
        id="text"
        variant="ghost"
        size="icon"
        onClick={() => setSelectedTool(SelectedTool.Text)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#a7a7ac"
          viewBox="0 0 36 36"
          className={`${selectedTool === "Text" ? "bg-gradient-to-br from-amethyst-500/75 to-royal-blue-500/75 text-white" : ""} hover:bg-[#31303b] hover:scale-105 transition-all duration-300 ease-in-out rounded-md p-2`}
        >
          <title>{"text-line"}</title>
          <path
            d="M12.19 8.84a1.45 1.45 0 0 0-1.4-1h-.12a1.46 1.46 0 0 0-1.42 1L1.14 26.56a1.29 1.29 0 0 0-.14.59 1 1 0 0 0 1 1 1.12 1.12 0 0 0 1.08-.77l2.08-4.65h11l2.08 4.59a1.24 1.24 0 0 0 1.12.83 1.08 1.08 0 0 0 1.08-1.08 1.64 1.64 0 0 0-.14-.57ZM6.08 20.71l4.59-10.22 4.6 10.22Z"
            className="clr-i-outline clr-i-outline-path-1"
          />
          <path
            d="M32.24 14.78a6.35 6.35 0 0 0-4.64-1.58 11.36 11.36 0 0 0-4.7 1 1 1 0 0 0-.58.89 1 1 0 0 0 .94.92 1.23 1.23 0 0 0 .39-.08 8.87 8.87 0 0 1 3.72-.81c2.7 0 4.28 1.33 4.28 3.92v.5a15.29 15.29 0 0 0-4.42-.61c-3.64 0-6.14 1.61-6.14 4.64v.05c0 2.95 2.7 4.48 5.37 4.48a6.29 6.29 0 0 0 5.19-2.48v1.28a1 1 0 0 0 1 1 1 1 0 0 0 1-1.06V19a5.71 5.71 0 0 0-1.41-4.22Zm-.56 7.7c0 2.28-2.17 3.89-4.81 3.89-1.94 0-3.61-1.06-3.61-2.86v-.06c0-1.8 1.5-3 4.2-3a15.2 15.2 0 0 1 4.22.61Z"
            className="clr-i-outline clr-i-outline-path-2"
          />
          <path fill="none" d="M0 0h36v36H0z" />
        </svg>
      </Button>
      {/* Pencil */}
      <Button
        id="pencil"
        variant="ghost"
        size="icon"
        onClick={() => setSelectedTool(SelectedTool.Pencil)}
      >
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          enableBackground="new 0 0 32 32"
          xmlSpace="preserve"
          className={`${selectedTool === "Pencil" ? "bg-gradient-to-br from-amethyst-500/75 to-royal-blue-500/75 text-white" : ""} hover:bg-[#31303b] hover:scale-105 transition-all duration-300 ease-in-out rounded-md p-2`}
        >
          <path
            fill="none"
            stroke="#a7a7ac"
            strokeWidth="2"
            strokeMiterlimit="10"
            d="M22.3,6.5l0.8-0.8c0.9-0.9,2.3-0.9,3.2,0l0,0
	c0.9,0.9,0.9,2.3,0,3.2l-0.8,0.8"
          />
          <line
            fill="none"
            stroke="#a7a7ac"
            strokeWidth="2"
            strokeMiterlimit="10"
            x1="18.9"
            y1="8.8"
            x2="23.2"
            y2="13.1"
          />
          <polyline
            fill="none"
            stroke="#a7a7ac"
            strokeWidth="2"
            strokeMiterlimit="10"
            points="10.8,25.6 10,22 6.4,21.2 "
          />
          <path
            fill="none"
            stroke="#a7a7ac"
            strokeWidth="2"
            strokeMiterlimit="10"
            d="M10.5,25.9L5,27l1.1-5.5L21.7,5.9l4.4,4.4L10.5,25.9
	z"
          />
          <path d="M8.5,26.3L5,27l0.7-3.5L8.5,26.3z" />
        </svg>
      </Button>

      <Button
        id="delete"
        variant="ghost"
        size="icon"
        onClick={() => setSelectedTool(SelectedTool.Delete)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          className={`${selectedTool === "Delete" ? "bg-gradient-to-br from-amethyst-500/75 to-royal-blue-500/75 text-red-400" : ""} hover:bg-[#31303b] hover:scale-105 transition-all duration-300 ease-in-out rounded-md p-2`}
          viewBox="0 0 52 52"
          fill="#ff8383"
        >
          <path d="M45.5 10H33V6c0-2.2-1.8-4-4-4h-6c-2.2 0-4 1.8-4 4v4H6.5c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h39c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM23 7c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v3h-6V7zM41.5 20h-31c-.8 0-1.5.7-1.5 1.5V45c0 2.8 2.2 5 5 5h24c2.8 0 5-2.2 5-5V21.5c0-.8-.7-1.5-1.5-1.5zM23 42c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V28c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v14zm10 0c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V28c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v14z" />
        </svg>
      </Button>
    </div>
  );
}
