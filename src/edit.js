/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
import { SelectControl, CheckboxControl } from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { data, current_user_id } = customTableData;

	// Use the data in your block editor UI
	let selectOptions = [{ label: "-- Select a Structure --", value: "9999999" }];
	let allStructures = {
		9999999: {
			structure: [],
			userID: 0,
			structureName: "Select structure",
			topLevelFolderName: "Select structure",
		},
	};
	let jsxElement;
	data.map((structure) => {
		// console.log(JSON.parse(structure.data.replaceAll("\\", "")));
		if (props.attributes.currentUser) {
			if (structure.user_id == current_user_id) {
				selectOptions.push({
					label: "id: " + structure.id + " - " + structure.folder_name,
					value: structure.id,
				});
			}
		} else {
			selectOptions.push({
				label: "id: " + structure.id + " - " + structure.folder_name,
				value: structure.id,
			});
		}
		allStructures[structure.id] = {
			structure: JSON.parse(structure.data.replaceAll("\\", "")),
			userID: structure.user_id,
			structureName: structure.folder_name,
			topLevelFolderName: structure.name,
		};
	});

	function renderObjectToJSX(obj) {
		if (obj != null) {
			console.log(obj.length);
			const lastIndex = obj.length - 1;
			return (
				<ul>
					{obj.map((item, index) => {
						const isLastFolder = index == lastIndex && item.type == "folder";
						const lastFolderClass = isLastFolder ? " last-folder" : "";
						return (
							<li
								key={index}
								className={
									item.type === "folder" ? `folder${lastFolderClass}` : "file"
								}
							>
								{setTheIcon(item)}
								{item.type === "folder" ? (
									<>
										{" " + item.name}
										{renderObjectToJSX(item.content)}
									</>
								) : (
									" " + item.name
								)}
							</li>
						);
					})}
				</ul>
			);
		}
	}

	function setTheIcon(item) {
		if (item.type === "folder") {
			return <i className="ppi ppi-folder"></i>;
		}

		// Get the file suffix to determine what icon to use
		const fileSuffix = item.name.split(".").at(-1);

		let icon;

		switch (fileSuffix) {
			// Programming
			case "html":
				icon = <i class="ppi ppi-html"></i>;
				break;
			case "js":
			case "jsx":
				icon = <i class="ppi ppi-javascript"></i>;
				break;
			case "css":
				icon = <i class="ppi ppi-css"></i>;
				break;
			case "scss":
				icon = <i class="ppi ppi-sass"></i>;
				break;
			case "php":
				icon = <i class="ppi ppi-php"></i>;
				break;
			case "py":
				icon = <i class="ppi ppi-python"></i>;
				break;
			case "c":
				icon = <i class="ppi ppi-c"></i>;
				break;
			case "cpp":
				icon = <i class="ppi ppi-cpp"></i>;
				break;
			case "go":
				icon = <i class="ppi ppi-go"></i>;
				break;
			case "java":
				icon = <i class="ppi ppi-java"></i>;
				break;
			case "md":
				icon = <i class="ppi ppi-markdown"></i>;
				break;
			case "r":
			case "rd":
			case "rsx":
				icon = <i class="ppi ppi-r"></i>;
				break;
			case "rb":
				icon = <i class="ppi ppi-ruby"></i>;
				break;
			case "rs":
				icon = <i class="ppi ppi-rust"></i>;
				break;
			case "swift":
				icon = <i class="ppi ppi-swift"></i>;
				break;
			case "ts":
			case "tsx":
				icon = <i class="ppi ppi-typescript"></i>;
				break;
			case "vue":
				icon = <i class="ppi ppi-vue"></i>;
				break;
			// Office documents
			case "doc":
			case "docx":
				icon = <i class="ppi ppi-word"></i>;
				break;
			case "xls":
			case "xlsx":
				icon = <i class="ppi ppi-excel"></i>;
				break;
			case "ppt":
			case "pptx":
				icon = <i class="ppi ppi-powerpoint"></i>;
				break;
			case "txt":
				icon = <i class="ppi ppi-txt"></i>;
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
				icon = <i class="ppi ppi-image"></i>;
				break;
			// Default
			default:
				icon = <i class="ppi ppi-document"></i>;
				break;
		}

		return icon;
	}

	let selectedStructure = parseInt(props.attributes.selectedStructure);
	let strucName =
		Object.keys(allStructures).length != 0
			? allStructures[selectedStructure].topLevelFolderName
			: "";
	console.log(
		location.origin + "/wp-admin/admin.php?page=pivemo_folder_structure",
	);
	return (
		<div {...useBlockProps()}>
			<p className="pfs-title-text">
				<i className="ppi ppi-folder"></i> {strucName}
			</p>
			{renderObjectToJSX(allStructures[selectedStructure].structure)}
			<div className="pfs-block-settings">
				<p className="pfs-title">{__("Pivemo Folder Structure")}</p>
				<div>
					<CheckboxControl
						label="Only list structures for Current user"
						value={props.attributes.currentUser}
						checked={props.attributes.currentUser}
						onChange={() => {
							props.setAttributes({
								currentUser: !props.attributes.currentUser,
							});
						}}
					/>
				</div>
				<SelectControl
					label="Select the folder structure you want to publish"
					value={props.attributes.selectedStructure}
					options={selectOptions}
					onChange={(setStructure) =>
						props.setAttributes({ selectedStructure: setStructure })
					}
					// __nextHasNoMarginBottom
				/>
				<a
					href={
						location.origin + "/wp-admin/admin.php?page=pivemo_folder_structure"
					}
					className="pfs-add-new-structure-link "
				>
					<i className="ppi ppi-plus"></i> Create new folder structure
				</a>
			</div>
		</div>
	);
}
