export const nav = (path) => {
  const navPath = path ? '' : 'pages/';
  return `<nav class="menu">
            <ul>
                <li><a href="./${navPath}home.html">Home</a></li>
                <li><a href="./${navPath}about.html">About</a></li>
                <li><a href="./${navPath}list.html">List</a></li>
            </ul>
        </nav>`;
};
