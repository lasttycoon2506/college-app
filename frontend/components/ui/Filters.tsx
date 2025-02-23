"use client";

import { useRouter } from "next/navigation";

export default function Filters() {
  const router = useRouter();
  let queryParams: URLSearchParams;
  if (window) {
    queryParams = new URLSearchParams(window.location.search);
  }

  function handleClick(checkBox: any) {
    const checkboxes = document.getElementsByName(checkBox.name);

    checkboxes.forEach((item) => {
      const inputItem = item as HTMLInputElement;

      if (inputItem.checked) {
        if (queryParams.has(checkBox.name)) {
          queryParams.set(checkBox.name, checkBox.value);
        } else {
          queryParams.append(checkBox.name, checkBox.value);
        }
      } else if (!inputItem.checked) {
        queryParams.delete(checkBox.name, checkBox.value);
      }

      router.replace(`?${queryParams.toString()}`);
    });
    console.log(queryParams);
  }

  function checkHandler(checkBoxName: string, checkBoxValue: string): boolean {
    return false;
  }

  return (
    <div className="form-control pt-5 ps-3">
      <div className="border-b border-blue-900 mr-3">
        <h1 className="text-center text-lg font-black pb-3">Filters:</h1>
      </div>
      <div className="border-b border-blue-900 py-3 mr-3 ...">
        <h4 className="font-semibold pb-2">
          <em>Tuition</em>
        </h4>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-xs"
            id="box1"
            name="tuition"
            value="0-10000"
            defaultChecked={checkHandler("tuition", "0-10000")}
            onClick={(e) => handleClick(e.target)}
          />
          <span className="label-text ps-1">$0 - $10,000 </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-secondary checkbox-xs"
            id="box2"
            name="tuition"
            value="10000-20000"
            defaultChecked={checkHandler("tuition", "10000-20000")}
            onClick={(e) => handleClick(e.target)}
          />
          <span className="label-text ps-1">$10,000 - $20,000 </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-accent checkbox-xs"
            id="box3"
            name="tuition"
            value="20000+"
            defaultChecked={checkHandler("tuition", "20000+")}
            onClick={(e) => handleClick(e.target)}
          />
          <span className="label-text ps-1">$20,000+ </span>
        </label>
      </div>
      <div className="border-b border-blue-900 py-3 mr-3 ...">
        <h4 className="font-semibold pb-2">
          <em>Type </em>
        </h4>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-warning checkbox-xs"
            id="box4"
            name="type"
            value="public"
            defaultChecked={checkHandler("type", "public")}
            onClick={(e) => handleClick(e.target)}
          />
          <span className="label-text ps-1">Public </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-info checkbox-xs"
            id="box5"
            name="type"
            value="private"
            defaultChecked={checkHandler("type", "private")}
            onClick={(e) => handleClick(e.target)}
          />
          <span className="label-text ps-1">Private </span>
        </label>
      </div>
      <div className="border-b border-blue-900 py-3 mr-3 ...">
        <h4 className="font-semibold pb-2">
          <em>Undergrad</em>
        </h4>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-error checkbox-xs"
            id="box6"
            name="undergrad"
            value="0-10000"
            defaultChecked={checkHandler("undergrad", "0-10000")}
            onClick={(e) => handleClick(e.target)}
          />
          <span className="label-text ps-1">0 - 10,000 </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-xs"
            id="box7"
            name="undergrad"
            value="10000-25000"
            defaultChecked={checkHandler("undergrad", "10000-25000")}
            onClick={(e) => handleClick(e.target)}
          />
          <span className="label-text ps-1">10,000 - 25,000 </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-secondary checkbox-xs"
            id="box8"
            name="undergrad"
            value="25000+"
            defaultChecked={checkHandler("undergrad", "25000+")}
            onClick={(e) => handleClick(e.target)}
          />
          <span className="label-text ps-1">25,000+ </span>
        </label>
      </div>
      <div className="border-b border-blue-900 py-3 mr-3 ...">
        <h4 className="font-semibold pb-2">
          <em>Deadline</em>
        </h4>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-accent checkbox-xs"
            id="box9"
            name="deadline"
            value="open"
            defaultChecked={checkHandler("deadline", "open")}
            onClick={(e) => handleClick(e.target)}
          />
          <span className="label-text ps-1">Open </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-error checkbox-xs"
            id="box10"
            name="deadline"
            value="closed"
            defaultChecked={checkHandler("deadline", "closed")}
            onClick={(e) => handleClick(e.target)}
          />
          <span className="label-text ps-1">Closed </span>
        </label>
      </div>
    </div>
  );
}
