export default function Filters() {
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
          />
          <span className="label-text ps-1">$0 - $10,000 </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-secondary checkbox-xs"
          />
          <span className="label-text ps-1">$10,000 - $20,000 </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-accent checkbox-xs"
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
          />
          <span className="label-text ps-1">Public </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-info checkbox-xs"
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
          />
          <span className="label-text ps-1">0 - 10,000 </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-xs"
          />
          <span className="label-text ps-1">10,000 - 25,000 </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-secondary checkbox-xs"
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
          />
          <span className="label-text ps-1">Open </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-error checkbox-xs"
          />
          <span className="label-text ps-1">Closed </span>
        </label>
      </div>
    </div>
  );
}
