let folderStructure;

jQuery(document).ready(function ($) {
	const setTopLevelFolderNameButton = $("#set-top-level-folder-name");
	const setTopLevelFolderNameInput = $("#top-level-folder-name-input");
	const topLevelLabel = $("#top-level-folder-name");
	const outputList = $("#output-list");
	const deleteRowButtons = document.querySelectorAll(".pfs-delete-row");
	const loadRowButtons = document.querySelectorAll(".pfs-load-row");

	folderStructure = {
		topLevelFolderName: "root-folder",
		structureName: "",
		topLevelContent: [],
	};

	topLevelLabel.text(folderStructure.topLevelFolderName);

	setTopLevelFolderNameButton.on("click", function () {
		if (setTopLevelFolderNameInput.val() !== "") {
			topLevelLabel.text(setTopLevelFolderNameInput.val());
			folderStructure.topLevelFolderName = setTopLevelFolderNameInput.val();
		}
	});

	function renderFolderStructure(structure) {
		outputList.html("");
		objectToUl(structure, null);
	}

	function objectToUl(obj, parentUl) {
		const ul = $("<ul>");

		// Check if topLevelContent is empty
		if (obj.length === 0) {
			ul.addClass("first-list");

			// If it's empty, add the functionality to add a file or folder directly
			const extraLi = $("<li>").addClass("add-item-row");

			// Add input fields for type and name
			const typeSelect = $("<select>");
			const fileOption = $("<option>").val("file").text("File");
			const folderOption = $("<option>").val("folder").text("Folder");
			typeSelect.append(fileOption, folderOption);

			const nameInput = $("<input>").attr({
				type: "text",
				placeholder: "File/Folder name",
			});

			const addButton = $("<button>")
				.addClass("add-button")
				.html('<i class="ppi ppi-plus"></i>')
				.on("click", function () {
					const itemType = typeSelect.val() || "file";
					const itemName = nameInput.val() || "new-item";

					const newFolder = {
						type: itemType,
						name: itemName,
						content: [],
					};

					obj.push(newFolder);

					outputList.html("");
					objectToUl(folderStructure.topLevelContent, null);
				});

			extraLi.append(typeSelect, nameInput, addButton);
			ul.append(extraLi);
		} else {
			$.each(obj, function (index, item) {
				const li = $("<li>");

				if (item.type === "folder") {
					li.html(`<i class="ppi ppi-folder"></i> ${item.name}`).addClass(
						"folder",
					);

					const deleteButton = $("<button>")
						.addClass("delete-button")
						.html('<i class="ppi ppi-trash"></i>')
						.on("click", function () {
							obj.splice(index, 1);

							outputList.html("");
							objectToUl(folderStructure.topLevelContent, null);
						});

					li.append(deleteButton);
					objectToUl(item.content, li);
				} else {
					let icon;
					if (item.name && typeof item.name === "string") {
						const fileSuffix = item.name.split(".").pop();
						switch (fileSuffix) {
							// Programming
							case "html":
								icon = '<i class="ppi ppi-html"></i> ';
								break;
							case "js":
							case "jsx":
								icon = '<i class="ppi ppi-javascript"></i> ';
								break;
							case "css":
								icon = '<i class="ppi ppi-css"></i> ';
								break;
							case "scss":
								icon = '<i class="ppi ppi-sass"></i> ';
								break;
							case "php":
								icon = '<i class="ppi ppi-php"></i> ';
								break;
							case "py":
								icon = '<i class="ppi ppi-python"></i> ';
								break;
							case "c":
								icon = '<i class="ppi ppi-c"></i> ';
								break;
							case "cpp":
								icon = '<i class="ppi ppi-cpp"></i> ';
								break;
							case "go":
								icon = '<i class="ppi ppi-go"></i> ';
								break;
							case "java":
								icon = '<i class="ppi ppi-java"></i> ';
								break;
							case "md":
								icon = '<i class="ppi ppi-markdown"></i> ';
								break;
							case "r":
							case "rd":
							case "rsx":
								icon = '<i class="ppi ppi-r"></i> ';
								break;
							case "rb":
								icon = '<i class="ppi ppi-ruby"></i> ';
								break;
							case "rs":
								icon = '<i class="ppi ppi-rust"></i> ';
								break;
							case "swift":
								icon = '<i class="ppi ppi-swift"></i> ';
								break;
							case "ts":
							case "tsx":
								icon = '<i class="ppi ppi-typescript"></i> ';
								break;
							case "vue":
								icon = '<i class="ppi ppi-vue"></i> ';
								break;
							// Office documents
							case "doc":
							case "docx":
								icon = '<i class="ppi ppi-word"></i> ';
								break;
							case "xls":
							case "xlsx":
								icon = '<i class="ppi ppi-excel"></i> ';
								break;
							case "ppt":
							case "pptx":
								icon = '<i class="ppi ppi-powerpoint"></i> ';
								break;
							case "txt":
								icon = '<i class="ppi ppi-txt"></i> ';
								break;
							// Images
							case "png":
							case "jpg":
							case "jpeg":
							case "webp":
							case "gif":
							case "ps":
							case "tif":
							case "eps":
							case "svg":
							case "ai":
								icon = '<i class="ppi ppi-image"></i> ';
								break;
							// Default
							default:
								icon = '<i class="ppi ppi-document"></i> ';
								break;
						}
					} else {
						icon = '<i class="ppi ppi-file"></i>'; // Default icon if name is undefined or not a string
					}

					li.html(`${icon} ${item.name}`).addClass("file");

					const deleteButton = $("<button>")
						.addClass("delete-button")
						.html('<i class="ppi ppi-trash"></i>')
						.on("click", function () {
							obj.splice(index, 1);

							outputList.html("");
							objectToUl(folderStructure.topLevelContent, null);
						});

					li.append(deleteButton);
				}

				ul.append(li);

				if (index === obj.length - 1) {
					const extraLi = $("<li>").addClass("add-item-row");

					const typeSelect = $("<select>");
					const fileOption = $("<option>").val("file").text("File");
					const folderOption = $("<option>").val("folder").text("Folder");
					typeSelect.append(fileOption, folderOption);

					const nameInput = $("<input>").attr({
						type: "text",
						placeholder: "File/Folder name",
					});

					const addButton = $("<button>")
						.addClass("add-button")
						.html('<i class="ppi ppi-plus"></i>')
						.on("click", function () {
							const itemType = typeSelect.val() || "file";
							const itemName = nameInput.val() || "new-item";

							const newFolder = {
								type: itemType,
								name: itemName,
								content: [],
							};

							obj.splice(index + 1, 0, newFolder);

							outputList.html("");
							objectToUl(folderStructure.topLevelContent, null);
						});

					extraLi.append(typeSelect, nameInput, addButton);
					ul.append(extraLi);
				}
			});
		}

		if (parentUl) {
			parentUl.append(ul);
		} else {
			outputList.append(ul);
		}
	}

	objectToUl(folderStructure.topLevelContent, null);

	const saveToWordPress = function () {
		// Save the updated data to WordPress options
		$.ajax({
			type: "POST",
			url: custom_folder_block_ajax_url.ajax_url,
			data: {
				action: "save_folder_structure",
				security: custom_folder_block_ajax_url.nonce,
				structure: JSON.stringify(folderStructure.topLevelContent),
				name: folderStructure.topLevelFolderName,
				structureName: folderStructure.structureName,
			},
			success: function (saveResponse) {
				console.log(saveResponse);
				// Handle success here if needed
				location.reload();
			},
			error: function (saveError) {
				console.error("Error saving data to WordPress options:", saveError);
				// Handle error here if needed
			},
		});
	};

	// Helper function to convert the existing structure to the new format
	const convertToNewDataFormat = function (oldData) {
		return oldData.map(function (item) {
			const newItem = {
				type: item.type,
				name: item.name,
				content: convertToNewDataFormat(item.content),
			};
			return newItem;
		});
	};

	const saveButton = $("#save-button");
	saveButton.on("click", function () {
		const structureName = document.getElementById("structure-name-input");
		folderStructure.structureName =
			structureName.value != ""
				? structureName.value
				: folderStructure.topLevelFolderName;
		saveToWordPress();
		// showSavedFolderStructures();
		renderFolderStructure(folderStructure.topLevelContent);
	});

	const loadFromWordPressById = function (id) {
		$.ajax({
			type: "POST",
			url: custom_folder_block_ajax_url.ajax_url,
			data: {
				action: "get_saved_structures_by",
				security: custom_folder_block_ajax_url.nonce,
				id: id,
			},
			success: function (response) {
				if (response.data.savedStructure) {
					const selectedData = JSON.parse(
						response.data.savedStructure.data.replaceAll("\\", ""),
					);
					folderStructure.topLevelContent = selectedData;
					folderStructure.topLevelFolderName =
						response.data.savedStructure.name;
					topLevelLabel.text(folderStructure.topLevelFolderName);
					renderFolderStructure(selectedData);
				}
			},
			error: function (error) {
				console.error("Error loading data from WordPress options:", error);
			},
		});
	};

	loadRowButtons.forEach((button) => {
		button.addEventListener("click", () => {
			loadFromWordPressById(button.value);
		});
	});

	const confirmDelete = function (id) {
		const confirmDelete = confirm(
			"Are you sure you want to delete this saved folder structure? This operation cannot be undone.",
		);
		if (confirmDelete) {
			// deleteFromWordPress(id);
			deleteRow(id);
			// showSavedFolderStructures();
		}
	};

	const deleteRow = function (id) {
		// Delete row
		$.ajax({
			type: "POST",
			url: custom_folder_block_ajax_url.ajax_url,
			data: {
				action: "delete_folder_structure",
				security: custom_folder_block_ajax_url.nonce,
				id: id,
			},
			success: function (deleteResponse) {
				console.log(deleteResponse);
				// Handle success here if needed
				location.reload();
			},
			error: function (deleteError) {
				console.error("Error deleting row:", deleteError);
				// Handle error here if needed
			},
		});
	};

	deleteRowButtons.forEach((deleteButton) => {
		deleteButton.addEventListener("click", () => {
			confirmDelete(deleteButton.value);
		});
	});
});
