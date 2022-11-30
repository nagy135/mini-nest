export default () => {
  return (
    <div className="container max-w-sm mx-auto my-2">
      <div className="collapse">
        <input type="checkbox" />
        <div className="collapse-title btn btn-info">Add new link</div>
        <div className="collapse-content">
          <div className="flex flex-col p-2 gap-3">
            <input type="text" placeholder="Link name" className="input input-bordered w-full" />
            <textarea className="textarea textarea-bordered w-full" placeholder="Url"></textarea>
            <button className="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};
