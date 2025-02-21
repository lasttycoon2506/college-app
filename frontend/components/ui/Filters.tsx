export default function Filters() {
  return (
    <div className="form-control py-20">
      <h3 className="text-center pb-8 text-lg font-black underline underline-offset-2">
        Filter:
      </h3>
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
