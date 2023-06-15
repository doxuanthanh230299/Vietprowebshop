import { Link } from "react-router-dom";

const Menu = ({categories}) => {
  return (
    <nav>
      <div id="menu" className="collapse navbar-collapse">
        <ul>
          {categories.map((category) => (
            <li className="menu-item" key={category._id}>
            <Link to={`category-${category._id}`}>{category.name}</Link>
          </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
