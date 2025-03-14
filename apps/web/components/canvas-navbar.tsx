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
      {/* Hand */}
      <Button
        id="hand"
        variant="ghost"
        size="icon"
        onClick={() => setSelectedTool(SelectedTool.Hand)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#a7a7ac"
          className={`${selectedTool === "Hand" ? "bg-gradient-to-br from-amethyst-500/75 to-royal-blue-500/75 text-white" : ""} hover:bg-[#31303b]  hover:scale-105 transition-all duration-300 ease-in-out rounded-md p-2`}
          viewBox="-14.5 0 144 144"
        >
          <g clipPath="url(#a)">
            <path
              fill="#a7a7ac"
              d="M7.301 86.37a165.94 165.94 0 0 0 2.896 3.12 63.835 63.835 0 0 1 6.948 8.238c2.098 3.306 4 6.731 5.698 10.259.945 1.872 1.923 3.807 2.948 5.674l.573 1.044c2.362 4.304 4.802 8.754 7.494 12.949a23.936 23.936 0 0 0 5.377 5.624 48.601 48.601 0 0 0 12.707 7.016 41.03 41.03 0 0 0 15.24 2.93 50.609 50.609 0 0 0 17.239-3.252 36.377 36.377 0 0 0 11.02-6.593c4.309-3.648 7.576-8.318 10.595-15.143 3.15-7.123 4.229-14.799 5.272-22.222.309-2.199.628-4.473.996-6.694a55.39 55.39 0 0 0 .558-7.046c.057-1.553.117-3.158.263-4.72 1.192-12.63.866-23.966-.998-34.656a58.183 58.183 0 0 0-2.893-10.756c-2.21-5.776-7.594-9.38-13.101-8.775-1.038.15-2.059.404-3.047.757-.354.112-.711.226-1.073.333a54.12 54.12 0 0 1-.205-1.12 18.483 18.483 0 0 0-.698-2.99c-.197-.558-.387-1.121-.578-1.686a30.978 30.978 0 0 0-2.72-6.419A8.768 8.768 0 0 0 81.73 8.13a9.583 9.583 0 0 0-7.626 2.104c-.46.375-.9.77-1.305 1.133-.065.057-.126.114-.188.169-.375-.683-.738-1.358-1.097-2.026-.957-1.781-1.862-3.464-2.892-5.105-1.707-2.719-4.447-3.88-7.923-3.361a9.676 9.676 0 0 0-7.26 4.915 62.405 62.405 0 0 0-2.795 6.085c-.288.694-.577 1.386-.872 2.071a40.877 40.877 0 0 1-.282-.46 31.124 31.124 0 0 0-1.768-2.66c-2.608-3.405-6.051-4.153-9.953-2.166-4.48 2.28-5.431 6.61-5.758 9.667a104.57 104.57 0 0 0-.685 11.452c.021 8.838.124 17.823.223 26.511.044 3.727.085 7.454.122 11.18.012 1.268.009 2.535.006 3.803v1.367c-.157-.132-.31-.263-.465-.4-.302-.263-.616-.54-.952-.785-6.702-4.873-13.837-6.59-21.206-5.101a9.639 9.639 0 0 0-7.23 5.837 10.21 10.21 0 0 0 1.275 9.63c.744.991 1.59 1.901 2.524 2.715.569.535 1.158 1.086 1.678 1.666ZM37.8 80.79c-.132-7.715-.298-15.751-.508-24.57-.042-1.794-.118-3.617-.192-5.382-.138-3.308-.282-6.73-.206-10.083.162-7.14.609-14.396 1.04-21.413l.048-.758c.206-3.354 1.453-5.119 4.04-5.705 2.11 1.378 3.42 3.65 3.999 6.947a145.002 145.002 0 0 1 1.838 14.965c.434 6.266.765 12.647 1.085 18.817.185 3.582.371 7.164.577 10.744.056.833.301 1.643.716 2.368a2.733 2.733 0 0 0 3.305 1.232 2.413 2.413 0 0 0 1.965-2.51c-.005-.847.017-1.696.038-2.545.08-1.744.048-3.491-.094-5.231-.938-9.05-.472-18.252-.02-27.15l.102-2.028c.197-3.938.52-7.803.842-11.397.302-3.375 1.322-6.047 3.118-8.172.959-1.133 1.74-1.652 2.373-1.59.652.065 1.304.721 2.05 2.078 2.494 4.525 3.136 9.622 3.577 14.455 1 10.952 1.008 22.556.028 37.624-.054.832-.156 1.68-.254 2.5-.126 1.042-.256 2.12-.291 3.192-.05 1.492.325 2.56 1.112 3.175.787.616 1.912.722 3.343.31a4.811 4.811 0 0 0 3.668-4.421l.107-1.139c.346-3.088.534-6.193.561-9.3-.07-8.104-.302-16.343-.525-24.307l-.054-1.94c-.024-.864-.109-1.738-.19-2.583-.232-2.396-.45-4.66.547-6.891l.323-.736c.501-1.283 1.15-2.503 1.935-3.636a2.892 2.892 0 0 1 2.592-1.316 2.822 2.822 0 0 1 2.152 1.856 35.272 35.272 0 0 1 1.889 6.367c1.59 7.163 1.346 14.57 1.11 21.732l-.01.314c-.28 8.495-.4 16.987-.488 24.898-.028 2.591.82 3.71 3.36 4.433a3.12 3.12 0 0 0 2.735-.24 3.073 3.073 0 0 0 1.13-2.463c.095-1.5.093-3.026.092-4.502 0-.638 0-1.276.005-1.914.015-1.388.028-2.776.039-4.164.026-2.979.053-5.958.104-8.936.025-1.483.074-2.968.124-4.45.088-2.626.177-5.345.13-8.018-.05-2.749 1.2-4.95 2.56-6.918a2.678 2.678 0 0 1 1.65-1.265 3.04 3.04 0 0 1 2.226.717 7.954 7.954 0 0 1 3.258 5.058l.462 2.28c1.099 5.404 2.232 10.992 2.972 16.533.913 7.563.94 15.206.079 22.775-.096.916-.105 1.84-.026 2.757.827 9.047-1.073 18.222-2.6 25.593a41.426 41.426 0 0 1-7.167 16.05c-3.55 4.881-8.718 8.317-15.802 10.501-12.936 3.994-25.043 1.838-37.014-6.59a12.028 12.028 0 0 1-3.052-2.915 103.47 103.47 0 0 1-5.669-9.1 363.631 363.631 0 0 1-7.9-15.587c-4.003-8.367-9.116-14.956-15.64-20.142a11.348 11.348 0 0 1-2.742-3.19 2.595 2.595 0 0 1-.31-2.119 3.116 3.116 0 0 1 1.798-1.758 9.964 9.964 0 0 1 4.097-.862c.764.002 1.526.077 2.276.221 5.736 1.076 9.578 3.21 12.09 6.716a17.473 17.473 0 0 1 2.028 4.49c.139.405.278.808.422 1.204.56 1.54 1.346 2.967 3.276 2.98 1.73-.005 2.94-1.042 3.393-2.888.252-1 .376-2.027.368-3.058Z"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M.778.887h113.546v142.425H.778z" />
            </clipPath>
          </defs>
        </svg>
      </Button>
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
      {/* Delete */}
      <Button
        id="delete"
        variant="ghost"
        size="icon"
        onClick={() => setSelectedTool(SelectedTool.Delete)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#ff8383"
          viewBox="0 0 24 24"
          className={`${selectedTool === "Delete" ? "bg-gradient-to-br from-amethyst-500/75 to-royal-blue-500/75 text-red-400" : ""} hover:bg-[#31303b] hover:scale-105 transition-all duration-300 ease-in-out rounded-md p-2`}
        >
          <path d="M20.454 19.028h-7.01l6.62-6.63a2.935 2.935 0 0 0 .87-2.09 2.844 2.844 0 0 0-.87-2.05l-3.42-3.44a2.93 2.93 0 0 0-4.13.01L3.934 13.4a2.946 2.946 0 0 0 0 4.14l1.48 1.49h-1.86a.5.5 0 0 0 0 1h16.9a.5.5 0 0 0 0-1.002Zm-7.24-13.5a1.956 1.956 0 0 1 2.73 0l3.42 3.44a1.868 1.868 0 0 1 .57 1.35 1.93 1.93 0 0 1-.57 1.37l-5.64 5.64-6.15-6.16Zm-1.19 13.5h-5.2l-2.18-2.2a1.931 1.931 0 0 1 0-2.72l2.23-2.23 6.15 6.15Z" />
        </svg>
      </Button>
    </div>
  );
}
