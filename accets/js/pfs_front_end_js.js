const struturesObj = folder_structure_object.data;

document.addEventListener("DOMContentLoaded", () => {
  const pfsStructureSontainer = document.querySelectorAll(".pfs-structure-container");
  pfsStructureSontainer.forEach((container) => {
    const objectId = container.dataset.structureId;
    function objectToUl(obj, parentUl) {
      const ul = document.createElement("ul");

      // Check if topLevelContent is empty
      if (obj.length === 0) {
        ul.setAttribute("class", "first-list");
      } else {
        obj.forEach((item, index) => {
          const li = document.createElement("li");
          if (index == obj.length - 1 && item.type == "folder") {
            li.classList.add("last-folder");
          }
          if (item.type === "folder") {
            li.innerHTML = `<i class="fas fa-folder-open"></i> ${item.name}`;
            li.classList.add("folder");
            objectToUl(item.content, li);
          } else {
            // Get the file suffix to determine what icon to use
            const fileSuffix = item.name.split(".").at(-1);
            let icon;

            switch (fileSuffix) {
              // Programming
              case "html":
                icon = `<i class="fab fa-html5"></i>`;
                break;
              case "js":
                icon = `<i class="fab fa-js-square"></i>`;
                break;
              case "jsx":
                icon = `<i class="fab fa-js-square"></i>`;
                break;
              case "css":
                icon = `<i class="fab fa-css3-alt"></i>`;
                break;
              case "scss":
                icon = `<i class="fab fa-sass"></i>`;
                break;
              case "php":
                icon = `<i class="fab fa-php"></i>`;
                break;
              case "py":
                icon = `<i class="fab fa-python"></i>`;
                break;
              // Office documents
              case "doc":
                icon = `<i class="fas fa-file-word"></i>`;
                break;
              case "docx":
                icon = `<i class="fas fa-file-word"></i>`;
                break;
              case "xls":
                icon = `<i class="fas fa-file-excel"></i>`;
                break;
              case "xlsx":
                icon = `<i class="fas fa-file-excel"></i>`;
                break;
              case "ppt":
                icon = `<i class="fas fa-file-powerpoint"></i>`;
                break;
              case "pptx":
                icon = `<i class="fas fa-file-powerpoint"></i>`;
                break;
              case "txt":
                icon = `<i class="fas fa-file-alt"></i>`;
                break;
              // Default
              default:
                icon = `<i class="fas fa-file"></i>`;
                break;
            }

            li.innerHTML = `${icon} ${item.name}`;
            li.classList.add("file");
          }
          ul.appendChild(li);
        });
      }

      // Append the ul to the parentUl or output-list
      if (parentUl) {
        parentUl.appendChild(ul);
      } else {
        container.appendChild(ul);
      }
    }

    let indexToUse;
    struturesObj.forEach((row, index) => {
      if (row.id === parseInt(objectId)) {
        indexToUse = index;
      }
    });

    const title = document.createElement("p");
    title.classList.add("pfs-title-text");
    title.innerHTML = `<i class="fas fa-folder-open"></i> ${struturesObj[indexToUse].name}`;
    container.append(title);
    objectToUl(struturesObj[indexToUse].data, null);
  });
});
