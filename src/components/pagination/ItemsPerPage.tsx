/* eslint-disable @typescript-eslint/no-explicit-any */

const ItemsPerPage = ({handleItemsPerPage}: any) => {
    return (
        <div>
        <p className="mb-2">
          How much data you want to see in one page?{" "}
          <select
            name="pageData"
            className="shadow-md border rounded-md min-w-16 px-1 py-1 ml-2"
            id="pageData"
            defaultValue={8}
            onChange={(e) => handleItemsPerPage(e.target.value)}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="35">35</option>
          </select>
        </p>
      </div>
    );
};

export default ItemsPerPage;