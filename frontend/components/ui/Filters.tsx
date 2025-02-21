export default function Filters() {
  return (
    <div className="form-control pt-3 ps-3">
      <div className="border-b border-blue-900">
        <h1 className="text-center text-lg font-black pb-3">Filters:</h1>
      </div>
      <div className="border-b border-blue-900 py-2 ...">
        <h4 className="font-bold pb-2">
          <em>Tuition</em>
        </h4>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-xs"
          />
          <span className="label-text ps-1">choice 1: </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-secondary checkbox-xs"
          />
          <span className="label-text ps-1">choice 2: </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-accent checkbox-xs"
          />
          <span className="label-text ps-1">choice 3: </span>
        </label>
      </div>
      <div className="border-b border-blue-900 py-2 ...">
        <h4 className="font-bold pb-2">
          <em>Type </em>
        </h4>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-warning checkbox-xs"
          />
          <span className="label-text ps-1">choice 1: </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-info checkbox-xs"
          />
          <span className="label-text ps-1">choice 2: </span>
        </label>
      </div>
      <div className="border-b border-blue-900 py-2 ...">
        <h4 className="font-bold pb-2">
          <em>Undergrad</em>
        </h4>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-error checkbox-xs"
          />
          <span className="label-text ps-1">choice 1: </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-xs"
          />
          <span className="label-text ps-1">choice 2: </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-secondary checkbox-xs"
          />
          <span className="label-text ps-1">choice 3: </span>
        </label>
      </div>
      <div className="border-b border-blue-900 py-2 ...">
        <h4 className="font-bold pb-2">
          <em>Deadline</em>
        </h4>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-accent checkbox-xs"
          />
          <span className="label-text ps-1">choice 1: </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-warning checkbox-xs"
          />
          <span className="label-text ps-1">choice 2: </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-info checkbox-xs"
          />
          <span className="label-text ps-1">choice 3: </span>
        </label>
      </div>
    </div>
  );
}
