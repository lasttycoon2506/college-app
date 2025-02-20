export default function filters() {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">Remember me</span>
        <input
          type="checkbox"
          className="checkbox checkbox-primary checkbox-sm"
        />
      </label>
      <label className="cursor-pointer label">
        <span className="label-text">Remember me</span>
        <input
          type="checkbox"
          className="checkbox checkbox-secondary checkbox-md"
        />
      </label>
      <label className="cursor-pointer label">
        <span className="label-text">Remember me</span>
        <input
          type="checkbox"
          className="checkbox checkbox-accent checkbox-lg"
        />
      </label>
      <label className="cursor-pointer label">
        <span className="label-text">Remember me</span>
        <input type="checkbox" className="checkbox checkbox-warning" />
      </label>
      <label className="cursor-pointer label">
        <span className="label-text">Remember me</span>
        <input type="checkbox" className="checkbox checkbox-info" />
      </label>
    </div>
  );
}
