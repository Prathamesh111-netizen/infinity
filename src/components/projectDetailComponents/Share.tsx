export default function Share() {
  return (
    <div>
      <div className="flex items-center justify-center bg-gray-900 text-white">
        <div className="w-full md:w-1/2 rounded-lg bg-gray-900 px-8 py-4 shadow-md m-4">
          <div className="px-1 py-4">
            <h3 className="font-bold text-2xl font-sans">Share with others</h3>
          </div>
          <ul className="grid grid-cols-4 gap-2 px-1">
            <li className="flex items-center flex-col">
              <img
                src="https://randomuser.me/api/portraits/men/20.jpg"
                alt=""
                className="rounded-full w-16 h-16 object-cover"
              />
              <h5 className="font-semibold">Alex</h5>
            </li>
            <li className="flex items-center flex-col">
              <img
                src="https://randomuser.me/api/portraits/women/11.jpg"
                alt=""
                className="rounded-full w-16 h-16 object-cover"
              />
              <h5 className="font-semibold">Sarah</h5>
            </li>
            <li className="flex items-center flex-col">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt=""
                className="rounded-full w-16 h-16 object-cover"
              />
              <h5 className="font-semibold">Jericho</h5>
            </li>
            <li className="flex items-center flex-col">
              <img
                src="https://randomuser.me/api/portraits/women/28.jpg"
                alt=""
                className="rounded-full w-16 h-16 object-cover"
              />
              <h5 className="font-semibold">Dianna</h5>
            </li>
            <li className="flex items-center flex-col">
              <img
                src="https://randomuser.me/api/portraits/men/66.jpg"
                alt=""
                className="rounded-full w-16 h-16 object-cover"
              />
              <h5 className="font-semibol">Bernard</h5>
            </li>
            <li className="flex items-center flex-col">
              <img
                src="https://randomuser.me/api/portraits/women/19.jpg"
                alt=""
                className="rounded-full w-16 h-16 object-cover"
              />
              <h5 className="font-semibold">Francis</h5>
            </li>
            <li className="flex items-center flex-col">
              <img
                src="https://randomuser.me/api/portraits/men/15.jpg"
                alt=""
                className="rounded-full w-16 h-16 object-cover"
              />
              <h5 className="font-semibold">Edna</h5>
            </li>
            <li className="flex items-center flex-col">
              <img
                src="https://randomuser.me/api/portraits/men/21.jpg"
                alt=""
                className="rounded-full w-16 h-16 object-cover"
              />
              <h5 className="font-semibold">Carson</h5>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
