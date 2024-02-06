<?php
/**
 * Plugin Name:       Pivemo Folder Structure
 * Description:       Display folder structures in a nice and clear way. Easy to use, display them using a shortcode.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Magnus Hållberg
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pivemo-folder-structure
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_pivemo_folder_structure_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_pivemo_folder_structure_block_init' );

// ###############################################################
// ########################    SETUP   ###########################
// ###############################################################

// Setup the settings page
function pfs_menu() {
    $admin_page_hook = add_menu_page( "Folder Structure", "Folder Structure", "manage_options", "pivemo_folder_structure", "pfs_settings_HTML", "dashicons-embed-generic", 120 );
    add_submenu_page( "pivemo_folder_structure", "Settings", "Settings", "manage_options", "pivemo_folder_structure", "pfs_settings_HTML" );
}
add_action('admin_menu', 'pfs_menu');

// Enqueue scripts and styles for the backend
function settings_page_accets() {
	wp_enqueue_style("pfs_admin_css", plugin_dir_url( __FILE__ ) . "accets/css/pfs_admin_css.css");
    wp_enqueue_script('jquery');
    wp_enqueue_script("pfs_admin_js", plugin_dir_url( __FILE__ ) . "accets/js/pfs_admin_js.js");
    wp_localize_script('pfs_admin_js', 'custom_folder_block_ajax_url', array(
		'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('custom-folder-block-nonce'),
	));
	wp_localize_script( 'pfs_admin_js', 'folder_structure_object', array(
		'structures' => get_option( 'custom_folder_structure'),
	) );
}
add_action("admin_enqueue_scripts", "settings_page_accets");

// Enqueue scripts and style for the frontend
function front_end_scripts() {
	wp_enqueue_style("pfs_frontend_css", plugin_dir_url( __FILE__ ) . "accets/css/pfs_frontend_css.css");
}
add_action( 'wp_enqueue_scripts', 'front_end_scripts');

// Create custom Database Table to store Folder Structures
function pfs_create_database_table() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'pivemo_folder_structures';

	$charset_collate = $wpdb->get_charset_collate();

	$sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        date datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
        name tinytext NOT NULL,
        folder_name tinytext,
        data text NOT NULL,
		user_id mediumint(9) NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta( $sql );
}

// Hook to create table on plugin activation
register_activation_hook( __FILE__, 'pfs_create_database_table' );

// Block accets
function enqueue_block_assets() {
    // Enqueue your block script
    wp_enqueue_script(
        'your-block-script',
        plugin_dir_url(__FILE__) . 'src/edit.js',
        array('wp-blocks', 'wp-element', 'wp-components', 'wp-editor'),
        time(), 
        true
    );

    // Localize the data from the custom table
    wp_localize_script(
        'your-block-script',
        'customTableData',
        array(
            'data' => pfs_get_all_structures(),
			'current_user_name' => get_current_user(),
			'current_user_id' => get_current_user_id(  ),
        )
    );
}
add_action('enqueue_block_editor_assets', 'enqueue_block_assets');

// ###############################################################
// ###################    AJAX HANDLERS   ########################
// ###############################################################

// AJAX handler to save folder structure
function save_folder_structure_ajax_handler() {
    check_ajax_referer('custom-folder-block-nonce', 'security');

    $data = $_POST['data'];
    $data = json_decode(stripslashes($data), true);

	$structure = $_POST['structure'];
	// $structure = json_decode(stripslashes($structure), true);
	$name = $_POST['name'];	
	$structure_name = $_POST['structureName'];	

    // Save the data to WordPress option
	pfs_insert_folder_structure($name, $structure, $structure_name);
    wp_send_json_success('Data saved successfully');
}

add_action('wp_ajax_save_folder_structure', 'save_folder_structure_ajax_handler');

// AJAX handler to get saved folder structure by id
function get_saved_structure_by() {
    check_ajax_referer('custom-folder-block-nonce', 'security');

	$id = $_POST['id'];

    // Assuming you have a function to retrieve saved structures from the database
    $saved_structure = pfs_get_folder_structure($id);

    error_log('Saved structures: ' . print_r($saved_structure, true)); // Add this line
	
    // Send the saved structures as a JSON response
    wp_send_json_success(array('savedStructure' => $saved_structure));
}

add_action('wp_ajax_get_saved_structures_by', 'get_saved_structure_by');

// AJAX handler to delete folder structure
function delete_folder_structure_ajax_handler() {
    check_ajax_referer('custom-folder-block-nonce', 'security');

    $id = $_POST['id'];

	pfs_delete_folder_structure($id);
    wp_send_json_success('Data saved successfully');
}

add_action('wp_ajax_delete_folder_structure', 'delete_folder_structure_ajax_handler');

// ###############################################################
// #################   DATABASE FUNCTIONS   ######################
// ###############################################################

// Insert Folder Structure to database
function pfs_insert_folder_structure($name, $structure, $structure_name) {
	global $wpdb;

	$table_name = $wpdb->prefix . 'pivemo_folder_structures';

	$wpdb->insert(
        $table_name,
        array(
            'date' => current_time( 'mysql' ),
            'name' => $name,
            'data' => $structure,
            'folder_name' => $structure_name,
			'user_id' => get_current_user_id(),
        )
    );
}

// Select Folder Structure Row
function pfs_get_folder_structure($id) {
    global $wpdb;

    $table_name = $wpdb->prefix . 'pivemo_folder_structures';

    $results = $wpdb->get_row( $wpdb->prepare("SELECT * FROM %i WHERE id=%d", $table_name, $id) );

    return $results;
}

// Delete Folder Structure from database
function pfs_delete_folder_structure($id) {
	global $wpdb;

	$table_name = $wpdb->prefix . 'pivemo_folder_structures';

	$wpdb->delete(
        $table_name,
        array(
            'id' => $id,
        )
    );
}

// Handle database insert via ajax
function insert_folder_structure_ajax_handler() {
	check_ajax_referer('custom-folder-block-nonce', 'security');

	$name = $_POST['name'];
	$structure = $_POST['structure'];
	$structure_name = $_POST['structureName'];

	$structure = stripcslashes($structure);
	
	pfs_insert_folder_structure($name, $structure, $structure_name);

	wp_send_json_success('Data saved successfully to custom table');

}

add_action('wp_ajax_insert_folder_structure', 'insert_folder_structure_ajax_handler');

// Get all folder structures for Javascript localize script
function pfs_get_all_structures() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'pivemo_folder_structures';
    // $query = "SELECT * FROM $table_name";
    // $results = $wpdb->get_results($query);
	$results = $wpdb->get_results( $wpdb->prepare("SELECT * FROM %i", $table_name) );

    return $results;
}

// ###############################################################
// ##################   RENDER FUNCTIONS   #######################
// ###############################################################

// Get folder structures from custom table
function pfs_get_structures() {
	global $wpdb;

	$table_name = $wpdb->prefix . 'pivemo_folder_structures';

	$results = $wpdb->get_results( $wpdb->prepare("SELECT * FROM %i", $table_name) );

	echo "<table class='pfs-saved-structures-table wp-list-table widefat striped table-view-list' cellspacing='0'>";
	echo "<thead><tr><th class='pfs-id-col'>id</th><td>Namn</td><td>Shortcode</td><td>User</td><td>Date</td><td>Action</td></tr></thed>";
	foreach( $results as $result ) {
		$userName = get_user_by( 'id', intval($result->user_id) );
		echo "<tr><td>$result->id</td><td>$result->folder_name</td><td>[pfs-folder-structure id='$result->id']</td><td>$userName->display_name</td><td>$result->date</td><td><button class='button button-primary pfs-load-row' value='$result->id'>Load</button><button class='button button-primary pfs-button-red-bg pfs-delete-row' value='$result->id'>Delete</button></td></tr>";
	}
	echo "</table>";
}

// Settings page HTML
function pfs_settings_HTML() { ?>
    <div class="wrap">
		<h1><?php _e('Folder Structure Settings', 'pivemo-folder-structure'); ?></h1>
        <div class="pfs_container">
			<div id="custom-folder-block">
				<label for="top-level-folder-name-input"><?php _e('Top Level Folder Name:', 'pivemo-folder-structure'); ?></label>
                <input type="text" id="top-level-folder-name-input" placeholder="Enter folder name">
                <button id="set-top-level-folder-name"><?php _e('Set Folder Name', 'pivemo-folder-structure'); ?></button>
                <h3 id="top-level-folder-name"><i class="ppi ppi-folder"></i></h3>
                <div id="output-list" data-list-content ></div>
				<input type="text" id="structure-name-input" placeholder="Enter name for the folder structure">
                <button id="save-button"><?php _e('Save Folder Structure', 'pivemo-folder-structure'); ?></button>
                <div id="saved-list">
					<?php pfs_get_structures(); ?>
				</div>
            </div>
        </div>
    </div>
<?php }


function generateHtml($array) {
	if (!null == $array) {    
		$html = '<ul>';
		$lastIndex = count($array) - 1;
		
		foreach ($array as $index => $item) {
			$isLastFolder = ($index === $lastIndex && $item->type === 'folder');
			$specialClass = ($isLastFolder) ? ' last-folder' : '';
			
			$html .= '<li class="' . $item->type . $specialClass . '">' . findIcon($item->name, $item->type) . $item->name;
			
			if ($item->type === 'folder' && !empty($item->content)) {
				$html .= generateHtml($item->content);
			}
			
			$html .= '</li>';
		}
		$html .= '</ul>';
		return $html;
	}
}

function findIcon($name, $type) {
	$fileSuffix = explode('.', $name);
	$fileSuffix = end($fileSuffix);

	if ($type == "folder") {
		return '<i class="ppi ppi-folder"></i> ';
	}

	switch ($fileSuffix) {
		// Programming
		case "html":
		  return '<i class="ppi ppi-html"></i> ';
		  break;
		case "js":
		  return '<i class="ppi ppi-javascript"></i> ';
		  break;
		case "jsx":
		  return '<i class="ppi ppi-javascript"></i> ';
		  break;
		case "css":
		  return '<i class="ppi ppi-css"></i> ';
		  break;
		case "scss":
		  return '<i class="ppi ppi-sass"></i> ';
		  break;
		case "php":
		  return '<i class="ppi ppi-php"></i> ';
		  break;
		case "py":
		  return '<i class="ppi ppi-python"></i> ';
		  break;
		case "c":
		  return '<i class="ppi ppi-c"></i> ';
		  break;
		case "cpp":
		  return '<i class="ppi ppi-cpp"></i> ';
		  break;
		case "go":
		  return '<i class="ppi ppi-go"></i> ';
		  break;
		case "java":
		  return '<i class="ppi ppi-java"></i> ';
		  break;
		case "md":
		  return '<i class="ppi ppi-markdown"></i> ';
		  break;
		case "r":
		  return '<i class="ppi ppi-r"></i> ';
		  break;
		case "rd":
		  return '<i class="ppi ppi-r"></i> ';
		  break;
		case "rsx":
		  return '<i class="ppi ppi-r"></i> ';
		  break;
		case "rb":
		  return '<i class="ppi ppi-ruby"></i> ';
		  break;
		case "rs":
		  return '<i class="ppi ppi-rust"></i> ';
		  break;
		case "swift":
		  return '<i class="ppi ppi-swift"></i> ';
		  break;
		case "ts":
		  return '<i class="ppi ppi-typescript"></i> ';
		  break;
		case "tsx":
		  return '<i class="ppi ppi-typescript"></i> ';
		  break;
		case "vue":
		  return '<i class="ppi ppi-vue"></i> ';
		  break;
		// Office documents
		case "doc":
		  return '<i class="ppi ppi-word"></i> ';
		  break;
		case "docx":
		  return '<i class="ppi ppi-word"></i> ';
		  break;
		case "xls":
		  return '<i class="ppi ppi-excel"></i> ';
		  break;
		case "xlsx":
		  return '<i class="ppi ppi-excel"></i> ';
		  break;
		case "ppt":
		  return '<i class="ppi ppi-powerpoint"></i> ';
		  break;
		case "pptx":
		  return '<i class="ppi ppi-powerpoint"></i> ';
		  break;
		case "txt":
		  return '<i class="ppi ppi-txt"></i> ';
		  break;
		// Images
		case "png":
		  return '<i class="ppi ppi-image"></i> ';
		  break;
		case "jpg":
		  return '<i class="ppi ppi-image"></i> ';
		  break;
		case "jpeg":
		  return '<i class="ppi ppi-image"></i> ';
		  break;
		case "webp":
		  return '<i class="ppi ppi-image"></i> ';
		  break;
		case "gif":
		  return '<i class="ppi ppi-image"></i> ';
		  break;
		case "ps":
		  return '<i class="ppi ppi-image"></i> ';
		  break;
		case "tif":
		  return '<i class="ppi ppi-image"></i> ';
		  break;
		case "eps":
		  return '<i class="ppi ppi-image"></i> ';
		  break;
		case "svg":
		  return '<i class="ppi ppi-image"></i> ';
		  break;
		case "ai":
		  return '<i class="ppi ppi-image"></i> ';
		  break;
		// Default
		default:
		  return '<i class="ppi ppi-document"></i> ';
		  break;
	  }
}

// ###############################################################
// ######################   SHORTCODE   ##########################
// ###############################################################

// Generate shortcodes
function pfs_shortcode($atts) {
	$a = shortcode_atts( [
		'id' => 9999999
	], $atts );

	if ($a["id"] === 9999999) {
		return "<div class='pfs-structure-container'><p class='pfs-frontend-error'>" . __('// You have to provide an id to your shortcode.', 'pivemo-folder-structure') . "</p></div>";
	}  else {
		global $wpdb;

		$table_name = $wpdb->prefix . 'pivemo_folder_structures';
	
		$id = $a["id"];
		$results = $wpdb->get_results( $wpdb->prepare("SELECT * FROM %i WHERE id=%d", $table_name, $id) );

		if ($results[0] != null) {
			$theStringThing = "";
			$toIterate = json_decode((stripcslashes($results[0]->data)));
			$name = $results[0]->name;
	
			return '<div class="pfs-structure-container"><p class="pfs-title-text"><i class="ppi ppi-folder"></i> ' . $name . '</p>' . generateHtml($toIterate) . "</div>";
		} else {
			return '<div class="pfs-structure-container">// There are no folder structures to show</div>';
		}
	}
}

add_shortcode( 'pfs-folder-structure', 'pfs_shortcode' );


// ###############################################################
// ######################   UNINSTALL   ##########################
// ###############################################################

// Clean up after uninstall
function delete_plugin_database_table(){
    global $wpdb;
    $table_name = $wpdb->prefix . 'pivemo_folder_structures';
    $wpdb->query($wpdb->prepare("DROP TABLE IF EXISTS %i", $table_name));
}

register_uninstall_hook(__FILE__, 'delete_plugin_database_table');