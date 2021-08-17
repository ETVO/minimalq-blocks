<?php
/**
 * Plugin Name: MinimalQ Blocks
 * Description: MinimalQ Content Blocks
 * Author: Estevão Rolim
 * Author URI: https://www.linkedin.com/in/estevaoprolim/
 * Version: 1.0
 * 
 * @package WordPress
 * @subpackage MinimalQ_Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Core constants 
define("MQ_BLOCKS_DIR", plugin_dir_path(__DIR__) . "minimalq-blocks/");
define("MQ_BLOCKS_URL", plugins_url("minimalq-blocks/"));
define("MQ_BLOCKS_CLASS_NAME", "MinimalQ_Blocks_Plugin");

/** 
 * MinimalQ Blocks plugin class
*/
final class MinimalQ_Blocks_Plugin {

    /**
     * Add actions and filters, and call functions
     * 
     * @since 1.0
     */
    public function __construct() {

        $this->plugin_constants();
        
        // Initialize blocks PHP
        add_action('init', array(MQ_BLOCKS_CLASS_NAME, 'plugin_setup'));

        // Enqueue scripts on init        
        add_action('wp_enqueue_scripts', array(MQ_BLOCKS_CLASS_NAME, 'plugin_css'));
        add_action('wp_enqueue_scripts', array(MQ_BLOCKS_CLASS_NAME, 'plugin_js'));

        add_action('admin_enqueue_scripts', array(MQ_BLOCKS_CLASS_NAME, 'plugin_admin_css'));
        add_action('admin_enqueue_scripts', array(MQ_BLOCKS_CLASS_NAME, 'plugin_admin_js'));

        // Filter to add custom block category
        add_filter( 'block_categories', array(MQ_BLOCKS_CLASS_NAME, 'custom_blocks_category'), 10, 2);

        // $this->include_blocks();
    }

    /**
     * Define plugin core constants
     * 
     * @since 1.0
     */
    public static function plugin_constants() {

        // JS and CSS paths
        define('MQ_BLOCKS_JS_URL', MQ_BLOCKS_URL . 'assets/js/');
        define('MQ_BLOCKS_CSS_URL', MQ_BLOCKS_URL . 'assets/css/');

        // Include paths
        define('MQ_BLOCKS_INC_URL', MQ_BLOCKS_URL . 'inc/');

        // Image paths
        define('MQ_BLOCKS_IMG_URL', MQ_BLOCKS_URL . 'assets/img/');
        
    }

    /**
	 * Include files
	 *
	 * @since 1.0
	 */
	public static function plugin_setup() {

		$dir = MQ_BLOCKS_INC_URL;
	}

    /**
     * Enqueue CSS
     * 
     * @since 1.0
     */
    public static function plugin_css() {

        $dir = MQ_BLOCKS_CSS_URL;

        // Registering the blocks.css for frontend + backend
        wp_enqueue_style(
            'mq-blocks-front', 
            $dir . 'blocks.css',
            is_admin() ? array('wp-editor') : null,
            null
        );
    }

    /**
     * Enqueue JS
     * 
     * @since 1.0
     */
    public static function plugin_js() {

        $dir = MQ_BLOCKS_JS_URL;

        // Registering the blocks.js file in the dist folder
        wp_enqueue_script(
            'mq-blocks-front-scripts',
            $dir . 'front.js',
            array(),
            null,
            true
        );

    }

    /**
     * Enqueue CSS for admin
     * 
     * @since 1.0
     */
    public static function plugin_admin_css() {

        $dir = MQ_BLOCKS_CSS_URL;

        // Registering the editor.css for backend
        wp_enqueue_style(
            'mq-blocks-back', 
            $dir . 'editor.css',
            array('wp-edit-blocks'),
            null
        );
    }

    /**
     * Enqueue JS for admin
     * 
     * @since 1.0
     */
    public static function plugin_admin_js() {

        $dir = MQ_BLOCKS_JS_URL;

        // Registering the blocks.js file in the dist folder
        wp_enqueue_script(
            'mq-blocks-scripts',
            $dir . 'blocks.js',
            array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components'),
            null,
            true
        );

        // WP Localized globals. Use dynamic PHP data in JavaScript via global object (array).
        wp_localize_script(
            'mq-blocks-scripts',
            'pluginGlobal',
            [
                'dirPath' => MQ_BLOCKS_DIR,
                'dirUrl'  => MQ_BLOCKS_URL,
                'homeUrl' => home_url(),
            ]
        );
    }

    /**
     * Add custom block category for WP page editor
     * 
     * @since 1.0
     */
    public static function custom_blocks_category($categories, $post) {
        return array_merge(
            array(
                array(
                    'slug' => 'minimalqblock',
                    'title' => __("MinimalQ Blocks", 'minimalq')
                )
            ),
            $categories
        );
    }
}

new MinimalQ_Blocks_Plugin();