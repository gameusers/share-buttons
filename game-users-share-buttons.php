<?php
/*
Plugin Name: Game Users Share Buttons
Plugin URI: https://gameusers.org/app/share-buttons
Description: Twitter、Facebook、Google+など（全10サイト）のシェアボタンが利用できるようになるプラグインです。自由度の高いカスタマイズが行え、他にないオリジナルのシェアボタンを作成できます。設定 > Game Users Share Buttons を開いてシェアボタンを作成・編集してください。
Version: 1.3.0
Author: Game Users
Author URI: https://gameusers.org/
License: GPL2
*/
/*  Copyright 2017 Game Users (email : mail@gameusers.org)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

require_once dirname(__FILE__) . '/modules/model.php';
require_once dirname(__FILE__) . '/modules/option.php';
require_once dirname(__FILE__) . '/modules/widget.php';

// define('GAME_USERS_SHARE_BUTTONS_URL', 'http://localhost/gameusers/public/');
define('GAME_USERS_SHARE_BUTTONS_URL', 'https://gameusers.org/');

define('GAME_USERS_SHARE_BUTTONS_DATABASE_VERSION', 3);
define('GAME_USERS_SHARE_BUTTONS_IMAGE_ALT', 'Game Users');
define('GAME_USERS_SHARE_BUTTONS_PLUGIN_URL', plugins_url('game-users-share-buttons'));

define(
    'GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT',
    WP_CONTENT_DIR . DIRECTORY_SEPARATOR . 'game-users-share-buttons'
);

define(
    'GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_JSON',
    GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT . DIRECTORY_SEPARATOR . 'json'
);

define(
    'GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_JSON_OPTION_JSON',
    GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_JSON . DIRECTORY_SEPARATOR . 'option.json'
);

define(
    'GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_THEMES',
    GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT . DIRECTORY_SEPARATOR . 'themes'
);



class Game_Users_Share_Buttons
{

    // --------------------------------------------------
    //   Property
    // --------------------------------------------------

    private $instanceModel = null;

    private $isFront = false;
    private $isSingle = false;
    private $isPage = false;
    private $isArchive = false;
    private $isAttachment = false;
    private $topThemeShow = false;
    private $bottomThemeShow = false;

    private $widgetArgsArr = array();


    public static $shareArr = array(
        'twitter' => array('name' => 'Twitter', 'count' => true),
        'facebook' => array('name' => 'Facebook', 'count' => true),
        'google-plus' => array('name' => 'Google+', 'count' => false),
        'pocket' => array('name' => 'Pocket', 'count' => true),
        'pinterest' => array('name' => 'Pinterest', 'count' => true),
        'linkedin' => array('name' => 'LinkedIn', 'count' => true),
        'tumblr' => array('name' => 'Tumblr', 'count' => false),
        'hatena' => array('name' => 'Hatena', 'count' => true),
        'line' => array('name' => 'LINE', 'count' => false),
        'feedly' => array('name' => 'Feedly', 'count' => true),
        'rss' => array('name' => 'RSS', 'count' => false),
        'mail' => array('name' => 'Mail', 'count' => false),
    );

    public $optionArr = array();



    // --------------------------------------------------
    //   Constructor
    // --------------------------------------------------

    public function __construct()
    {

        // --------------------------------------------------
        //   Model & Constant Edit Themes Arr for Widget
        // --------------------------------------------------

        $this->instanceModel = new Game_Users_Share_Buttons_Model();
        $this->optionArr = $this->instanceModel->getOptionArr();


        // --------------------------------------------------
        //   Plugin Activation
        // --------------------------------------------------

        register_activation_hook(__FILE__, array( $this, 'activate' ));
        register_deactivation_hook(__FILE__, array( $this, 'deactivate' ));
        register_uninstall_hook(__FILE__, 'Game_Users_Share_Buttons::uninstall');


        // --------------------------------------------------
        //   Plugin Upgrade
        // --------------------------------------------------

        add_action('upgrader_process_complete', array( $this, 'upgradeCompleted' ), 10, 2);


        // --------------------------------------------------
        //   Content Page
        // --------------------------------------------------

        add_action('wp_enqueue_scripts', array( $this, 'head' ));
        add_filter('the_content', array( $this, 'view' ));


        // --------------------------------------------------
        //   Widget
        // --------------------------------------------------

        add_action('widgets_init', array( $this, 'registerWidgetGameUsersShareButtons' ));


        // --------------------------------------------------
        //   Admin Option Page
        // --------------------------------------------------

        add_action('admin_enqueue_scripts', array( $this, 'optionHead' ));
        add_action('admin_menu', array( $this, 'optionView' ));


        // --------------------------------------------------
        //    Ajax
        // --------------------------------------------------

        add_action('wp_ajax_game_users_share_buttons_ajax_save_theme', array( $this, 'ajaxSaveTheme' ));
        add_action('wp_ajax_game_users_share_buttons_ajax_delete_theme', array( $this, 'ajaxDeleteTheme' ));
        add_action('wp_ajax_game_users_share_buttons_ajax_set_top_bottom_theme', array( $this, 'ajaxSetTopBottomTheme' ));
        add_action('wp_ajax_game_users_share_buttons_ajax_top_bottom_theme_save_option', array( $this, 'ajaxTopBottomThemeSaveOption' ));
        add_action('wp_ajax_game_users_share_buttons_ajax_move_edit_tab', array( $this, 'ajaxMoveEditTab' ));
        add_action('wp_ajax_game_users_share_buttons_ajax_save_option', array( $this, 'ajaxSaveOption' ));
        add_action('wp_ajax_game_users_share_buttons_ajax_change_plan', array( $this, 'ajaxChangePlan' ));

    }



    // --------------------------------------------------
    //   Share Buttons Code
    // --------------------------------------------------

    public static function code($themeNameId, $marginArr)
    {
        $escValue = esc_attr($themeNameId);
        $escMarginTop = esc_attr($marginArr[0]);
        $escMarginRight = esc_attr($marginArr[1]);
        $escMarginBottom = esc_attr($marginArr[2]);
        $escMarginLeft = esc_attr($marginArr[3]);

        return "<div data-game-users-share-buttons=\"${escValue}\" style=\"margin: ${escMarginTop}px ${escMarginRight}px ${escMarginBottom}px ${escMarginLeft}px;\"></div>";
    }


    // --------------------------------------------------
    //   Content Page
    // --------------------------------------------------

    public function head()
    {

        // --------------------------------------------------
        //   Conditional Tag & Constant for Widget
        // --------------------------------------------------

        if (is_front_page() || is_home()) {
            $this->isFront = true;
        } elseif (is_single()) {
            $this->isSingle = true;

            if (is_attachment()) {
                $this->isAttachment = true;
            }
        } elseif (is_page()) {
            $this->isPage = true;

            if (is_attachment()) {
                $this->isAttachment = true;
            }
        } elseif (is_archive()) {
            $this->isArchive = true;
        }

        define('GAME_USERS_SHARE_BUTTONS_PLUGIN_IS_FRONT', $this->isFront);
        define('GAME_USERS_SHARE_BUTTONS_PLUGIN_IS_SINGLE', $this->isSingle);
        define('GAME_USERS_SHARE_BUTTONS_PLUGIN_IS_PAGE', $this->isPage);
        define('GAME_USERS_SHARE_BUTTONS_PLUGIN_IS_ARCHIVE', $this->isArchive);
        define('GAME_USERS_SHARE_BUTTONS_PLUGIN_IS_ATTACHMENT', $this->isAttachment);


        // --------------------------------------------------
        //   Show Top Theme
        // --------------------------------------------------

        if ($this->optionArr['topThemeShowArr']['front'] && $this->isFront) {
            $this->topThemeShow = true;
        } elseif ($this->optionArr['topThemeShowArr']['single'] && $this->isSingle && ! $this->isAttachment) {
            $this->topThemeShow = true;
        } elseif ($this->optionArr['topThemeShowArr']['page'] && $this->isPage && ! $this->isAttachment) {
            $this->topThemeShow = true;
        } elseif ($this->optionArr['topThemeShowArr']['archive'] && $this->isArchive) {
            $this->topThemeShow = true;
        } elseif ($this->optionArr['topThemeShowArr']['attachment'] && $this->isAttachment) {
            $this->topThemeShow = true;
        }


        // --------------------------------------------------
        //   Show Bottom Theme
        // --------------------------------------------------

        if ($this->optionArr['bottomThemeShowArr']['front'] && $this->isFront) {
            $this->bottomThemeShow = true;
        } elseif ($this->optionArr['bottomThemeShowArr']['single'] && $this->isSingle && ! $this->isAttachment) {
            $this->bottomThemeShow = true;
        } elseif ($this->optionArr['bottomThemeShowArr']['page'] && $this->isPage && ! $this->isAttachment) {
            $this->bottomThemeShow = true;
        } elseif ($this->optionArr['bottomThemeShowArr']['archive'] && $this->isArchive) {
            $this->bottomThemeShow = true;
        } elseif ($this->optionArr['bottomThemeShowArr']['attachment'] && $this->isAttachment) {
            $this->bottomThemeShow = true;
        }


        // --------------------------------------------------
        //   Read share-bundle.min.js
        // --------------------------------------------------

        if ($this->topThemeShow || $this->bottomThemeShow) {
            wp_enqueue_script('game-users-share', GAME_USERS_SHARE_BUTTONS_PLUGIN_URL . '/js/share-bundle.min.js', array('jquery'), '1.3.0', true);
        }


        // --------------------------------------------------
        //   Browsersync Snippet
        // --------------------------------------------------

        if ($_SERVER['HTTP_HOST'] === 'localhost') {
            wp_enqueue_script('browsersync-snippet', GAME_USERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/browsersync/snippet.js', array(), '2.23.6', true);
        }

    }

    public function view($article)
    {

        // --------------------------------------------------
        //   Render Code - Top Theme
        // --------------------------------------------------

        $top = null;

        if ($this->topThemeShow && isset($this->optionArr['topTheme'])) {
            $topMarginArr = $this->isPage ? $this->optionArr['topThemePageMarginArr'] : $this->optionArr['topThemeSingleMarginArr'];
            $top = Game_Users_Share_Buttons::code($this->optionArr['topTheme'], $topMarginArr);
        }


        // --------------------------------------------------
        //   Render Code - Bottom Theme
        // --------------------------------------------------

        $bottom = null;

        if ($this->bottomThemeShow && isset($this->optionArr['bottomTheme'])) {
            $bottomMarginArr = $this->isPage ? $this->optionArr['bottomThemePageMarginArr'] : $this->optionArr['bottomThemeSingleMarginArr'];
            $bottom = Game_Users_Share_Buttons::code($this->optionArr['bottomTheme'], $bottomMarginArr);
        }

        return "{$top}{$article}{$bottom}";

    }


    // --------------------------------------------------
    //   Widget
    // --------------------------------------------------

    public function registerWidgetGameUsersShareButtons()
    {
        $this->widgetArgsArr['editThemesArr'] = $this->optionArr['editThemesArr'];
        $widget = new Game_Users_Share_Buttons_Temp_Widget($this->widgetArgsArr);
        register_widget($widget);
    }


    // --------------------------------------------------
    //   Admin Option Page
    // --------------------------------------------------

    public function optionHead($hook)
    {
        if ($hook === 'settings_page_game-users-share-buttons') {


            // --------------------------------------------------
            //   Version Up Option
            // --------------------------------------------------

            $this->instanceModel->versionUpOption();


            wp_enqueue_script('jquery-ui-sortable');
            wp_enqueue_style('jquery-confirm', GAME_USERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/jquery/confirm/jquery-confirm.min.css', array(), '3.3.2');
            wp_enqueue_script('jquery-confirm', GAME_USERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/jquery/confirm/jquery-confirm.min.js', array('jquery'), '3.3.2');

            wp_enqueue_style('bootstrap', GAME_USERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/bootstrap/bootstrap.min.css', array(), '3.3.7');
            wp_enqueue_style('ladda-bootstrap', GAME_USERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/bootstrap/ladda/ladda-themeless.min.css', array(), '0.9.4');
            wp_enqueue_script('ladda-bootstrap-spin', GAME_USERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/bootstrap/ladda/spin.min.js', array(), '0.9.4');
            wp_enqueue_script('ladda-bootstrap', GAME_USERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/bootstrap/ladda/ladda.min.js', array(), '0.9.4');

            wp_enqueue_script('game-users-option', GAME_USERS_SHARE_BUTTONS_PLUGIN_URL . '/js/option-bundle.min.js', array('jquery'), '1.3.0', true);

            $instanceOption = new Game_Users_Share_Buttons_Option();
            $instanceOption->jsFunctionAdmin($this->optionArr);


            // --------------------------------------------------
            //   Browsersync Snippet
            // --------------------------------------------------

            if ($_SERVER['HTTP_HOST'] === 'localhost') {
                wp_enqueue_script('browsersync-snippet', GAME_USERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/browsersync/snippet.js', array(), '2.23.6', true);
            }

        }
    }

    public function optionView()
    {
        $instanceOption = new Game_Users_Share_Buttons_Option();
        $instanceOption->option($this->optionArr);
    }


    // --------------------------------------------------
    //    Ajax
    // --------------------------------------------------

    public function ajaxSaveTheme()
    {

        $returnArr = array();
        $returnArr['error'] = false;


        try {


            // --------------------------------------------------
            //   Set Data
            // --------------------------------------------------

            $dataJson = urldecode($_POST['dataJson']);
            $dataArr = json_decode($dataJson, true);


            // --------------------------------------------------
            //   Validation & Set Value
            // --------------------------------------------------

            if (empty($dataArr['name']) || empty($dataArr['id'])) {
                throw new Exception('json1');
            }

            if (!ctype_alnum($dataArr['name']) || !ctype_alnum($dataArr['id'])) {
                throw new Exception('json2');
            }

            if (mb_strlen($dataArr['name']) > 20 || mb_strlen($dataArr['id']) !== 8) {
                throw new Exception('json3');
            }


            $themeNameId = $dataArr['name'] . '-' . $dataArr['id'];
            $themeNameIdPrev = (isset($_POST['themeNameIdPrev'])) ? sanitize_text_field($_POST['themeNameIdPrev']) : null;
            $directoryPath = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'themes' . DIRECTORY_SEPARATOR . $themeNameId;
            $dataJsonPath = $directoryPath . DIRECTORY_SEPARATOR . 'data.json';



            // --------------------------------------------------
            //   Rename Directory
            // --------------------------------------------------

            if ($themeNameIdPrev && $themeNameIdPrev !== $themeNameId) {
                $directoryPathBefore = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'themes' . DIRECTORY_SEPARATOR . $themeNameIdPrev;

                if (file_exists($directoryPathBefore)) {
                    rename($directoryPathBefore, $directoryPath);
                }
            }


            // --------------------------------------------------
            //   Make Directory
            // --------------------------------------------------

            if (!file_exists($directoryPath)) {
                if(!mkdir($directoryPath)) {
                    throw new Exception('directory1');
                }
            }


            // --------------------------------------------------
            //   Delete Unnecessary Image
            // --------------------------------------------------

            if (file_exists($dataJsonPath)) {
                $preJson = file_get_contents($dataJsonPath);
                $preJson = mb_convert_encoding($preJson, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
                $preDataArr = json_decode($preJson, true);

                $diffArr = array_diff_key($preDataArr['share'], $dataArr['share']);

                if ($diffArr) {
                    foreach ($diffArr as $key => $value) {
                        $deletedImagePath = $directoryPath . DIRECTORY_SEPARATOR . $key . '.' . $value['extension'];

                        if (file_exists($deletedImagePath)) {
                            unlink($deletedImagePath);
                        }
                    }
                }
            }


            // --------------------------------------------------
            //   Save data.json
            // --------------------------------------------------

            if (!file_put_contents($dataJsonPath, $dataJson)) {
                throw new Exception('dataJson');
            }


            // --------------------------------------------------
            //   Save Images
            // --------------------------------------------------

            foreach ($_FILES as $key => $value) {
                if (!array_key_exists($key, Game_Users_Share_Buttons::$shareArr) && $key !== 'freeUploadImage') {
                    throw new Exception('image1');
                }

                if (isset($value['error']) && is_int($value['error'])) {
                    if ($value['error'] !== 0) {
                        throw new Exception('image2');
                    }

                    $finfo = finfo_open(FILEINFO_MIME_TYPE);
                    $mimeType = finfo_file($finfo, $value['tmp_name']);
                    finfo_close($finfo);

                    if ($mimeType === 'image/gif') {
                        $extension = 'gif';
                    } elseif ($mimeType === 'image/jpeg') {
                        $extension = 'jpg';
                    } elseif ($mimeType === 'image/png') {
                        $extension = 'png';
                    } elseif ($mimeType === 'image/svg+xml') {
                        $extension = 'svg';
                    } else {
                        throw new Exception('image3');
                    }

                    $filename = $key;

                    if ($key === 'freeUploadImage') {
                        $filename = 'free';
                    }

                    $imagePath = $directoryPath . DIRECTORY_SEPARATOR . $filename . '.' . $extension;

                    if (!move_uploaded_file($value['tmp_name'], $imagePath)) {
                        throw new Exception('image4');
                    }
                }
            }




            // --------------------------------------------------
            //   wp-content / Delete Directory
            // --------------------------------------------------

            Game_Users_Share_Buttons::deleteDirectory(GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_THEMES . DIRECTORY_SEPARATOR . $themeNameId);

            if ($themeNameIdPrev && $themeNameIdPrev !== $themeNameId) {
                $path = GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_THEMES . DIRECTORY_SEPARATOR . $themeNameIdPrev;
                Game_Users_Share_Buttons::deleteDirectory($path);
            }


            // --------------------------------------------------
            //   wp-content / Copy Directory
            // --------------------------------------------------

            Game_Users_Share_Buttons::copyDirectory($directoryPath, GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_THEMES . DIRECTORY_SEPARATOR . $themeNameId);




            // --------------------------------------------------
            //   Get Edit Themes Arr
            // --------------------------------------------------

            $instanceModel = new Game_Users_Share_Buttons_Model();
            $editThemesArr = $instanceModel->getEditThemesArr();


            // ---------------------------------------------
            //   Delete Previous Theme
            //   前の名前のテーマを削除する
            // ---------------------------------------------

            if ($themeNameIdPrev) {

                $keyNumber = array_search($themeNameIdPrev, $editThemesArr);

                if ($keyNumber !== false) {
                    array_splice($editThemesArr, $keyNumber, 1);
                }

            }


            // ---------------------------------------------
            //   Sort Edit Themes Arr
            //   テーマを一度削除してから再度追加する。順番を前に入れ替えるため
            // ---------------------------------------------

            $keyNumber = array_search($themeNameId, $editThemesArr);

            if ($keyNumber !== false) {
                array_splice($editThemesArr, $keyNumber, 1);
            }

            array_unshift($editThemesArr, $themeNameId);


            // ---------------------------------------------
            //   Update Option
            // ---------------------------------------------

            $instanceModel->updateOption('editThemesArr', $editThemesArr);


            // ---------------------------------------------
            //   Set Return Data
            // ---------------------------------------------

            $returnArr['editThemesArr'] = $editThemesArr;



            // --------------------------------------------------
            //   For Cache Clear
            // --------------------------------------------------

            // ---------------------------------------------
            //   - Get Option Arr
            // ---------------------------------------------

            $optionArr = $instanceModel->getOptionArr();
            $jsonArr['queryControlCache'] = mt_rand(10000000, 99999999);
            $jsonArr['php'] = $optionArr['php'];
            $jsonArr['twitterApiType'] = $optionArr['twitterApiType'];
            $jsonArr['rssUrl'] = $optionArr['rssUrl'];


            // ---------------------------------------------
            //   - Save Option Json
            // ---------------------------------------------

            $path = dirname(__FILE__) . '/json/option.json';
            $encodedJson = json_encode($jsonArr);

            if (!file_put_contents($path, $encodedJson)) {
                throw new Exception('optionJson');
            }

            copy($path, GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_JSON_OPTION_JSON);


        } catch (Exception $e) {

            $returnArr['error'] = true;
            $returnArr['errorMessage'] = 'Error Message: ' . $e->getMessage();

        }


        // --------------------------------------------------
        //   Output
        // --------------------------------------------------

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($returnArr);

        exit();

    }


    public function ajaxDeleteTheme()
    {

        $returnArr = array();


        try {


            // --------------------------------------------------
            //   Validation
            // --------------------------------------------------

            if (empty($_POST['themeNameId'])) {
                throw new Exception('themeNameId');
            }


            // --------------------------------------------------
            //   Set Value
            // --------------------------------------------------

            $themeNameId = sanitize_text_field($_POST['themeNameId']);
            $path = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'themes' . DIRECTORY_SEPARATOR . $themeNameId;
            $pathWpContent = GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_THEMES . DIRECTORY_SEPARATOR . $themeNameId;


            // --------------------------------------------------
            //   Delete Directory
            // --------------------------------------------------

            Game_Users_Share_Buttons::deleteDirectory($path);
            Game_Users_Share_Buttons::deleteDirectory($pathWpContent);


            // --------------------------------------------------
            //   Get Edit Themes Arr
            // --------------------------------------------------

            $instanceModel = new Game_Users_Share_Buttons_Model();
            $editThemesArr = $instanceModel->getEditThemesArr();


            // ---------------------------------------------
            //   Delete Theme in Edit Themes Arr
            //   テーマを削除する
            // ---------------------------------------------

            $keyNumber = array_search($themeNameId, $editThemesArr);

            if ($keyNumber !== false) {
                array_splice($editThemesArr, $keyNumber, 1);
            }


            // ---------------------------------------------
            //   Update Option
            // ---------------------------------------------

            $instanceModel->updateOption('editThemesArr', $editThemesArr);


            // ---------------------------------------------
            //   Set Return Data
            // ---------------------------------------------

            $returnArr['editThemesArr'] = $editThemesArr;


            // ---------------------------------------------
            //   Delete Top & Bottom Themes
            //   Top と Bottom に設定されたテーマを削除する
            // ---------------------------------------------

            $themeArr = $instanceModel->getOptionTopBottomTheme();
            $topTheme = $themeArr['topTheme'];
            $bottomTheme = $themeArr['bottomTheme'];

            if ($topTheme === $themeNameId) {
                $instanceModel->updateOption('topTheme', null);
            }

            if ($bottomTheme === $themeNameId) {
                $instanceModel->updateOption('bottomTheme', null);
            }


        } catch (Exception $e) {

            $returnArr['error'] = 'Error: ' . $e->getMessage();

        }


        // --------------------------------------------------
        //   Output
        // --------------------------------------------------

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($returnArr);

        exit();

    }



    public function ajaxSetTopBottomTheme()
    {

        $returnArr = array();
        $returnArr['error'] = false;


        try {


            // --------------------------------------------------
            //   Validation & Set Value
            // --------------------------------------------------

            if (empty($_POST['type']) || ($_POST['type'] !== 'top' && $_POST['type'] !== 'bottom')) {
                throw new Exception('type');
            } else {
                $type = sanitize_text_field($_POST['type']);
            }

            if (isset($_POST['themeNameId']) && $_POST['themeNameId']) {
                $themeNameId = sanitize_text_field($_POST['themeNameId']);
            } else {
                $themeNameId = null;
            }


            // --------------------------------------------------
            //   Get Current Top Theme & Bottom Theme
            // --------------------------------------------------

            $instanceModel = new Game_Users_Share_Buttons_Model();
            $themeArr = $instanceModel->getOptionTopBottomTheme();
            $topTheme = $themeArr['topTheme'];
            $bottomTheme = $themeArr['bottomTheme'];


            // --------------------------------------------------
            //   Update Option & Set Return Data
            // --------------------------------------------------

            $returnArr['top'] = $topTheme;
            $returnArr['bottom'] = $bottomTheme;

            if ($type === 'top' && ($topTheme === $themeNameId || $themeNameId === null)) {

                $instanceModel->updateOption('topTheme', null);
                $returnArr['top'] = '';

            } elseif ($type === 'top') {

                $instanceModel->updateOption('topTheme', $themeNameId);
                $returnArr['top'] = $themeNameId;

            } elseif ($type === 'bottom' && ($bottomTheme === $themeNameId || $themeNameId === null)) {

                $instanceModel->updateOption('bottomTheme', null);
                $returnArr['bottom'] = '';

            } elseif ($type === 'bottom') {

                $instanceModel->updateOption('bottomTheme', $themeNameId);
                $returnArr['bottom'] = $themeNameId;

            }


        } catch (Exception $e) {

            $returnArr['error'] = true;

        }


        // --------------------------------------------------
        //   Output
        // --------------------------------------------------

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($returnArr);

        exit();

    }



    public function ajaxTopBottomThemeSaveOption()
    {

        $returnArr = array();
        $returnArr['error'] = false;


        try {


            // --------------------------------------------------
            //   Validation & Set Value
            // --------------------------------------------------

            if (empty($_POST['type']) || ($_POST['type'] !== 'top' && $_POST['type'] !== 'bottom')) {
                throw new Exception('type');
            } else {
                $type = sanitize_text_field($_POST['type']);
            }


            // --------------------------------------------------
            //   Save Array
            // --------------------------------------------------

            $saveArr = array();

            if ($type === 'top') {

                $topThemeSingleMarginTop = isset($_POST['topThemeSingleMarginTop']) ? (int) sanitize_text_field($_POST['topThemeSingleMarginTop']) : 0;
                $topThemeSingleMarginRight = isset($_POST['topThemeSingleMarginRight']) ? (int) sanitize_text_field($_POST['topThemeSingleMarginRight']) : 0;
                $topThemeSingleMarginBottom = isset($_POST['topThemeSingleMarginBottom']) ? (int) sanitize_text_field($_POST['topThemeSingleMarginBottom']) : 0;
                $topThemeSingleMarginLeft = isset($_POST['topThemeSingleMarginLeft']) ? (int) sanitize_text_field($_POST['topThemeSingleMarginLeft']) : 0;
                $topThemePageMarginTop = isset($_POST['topThemePageMarginTop']) ? (int) sanitize_text_field($_POST['topThemePageMarginTop']) : 0;
                $topThemePageMarginRight = isset($_POST['topThemePageMarginRight']) ? (int) sanitize_text_field($_POST['topThemePageMarginRight']) : 0;
                $topThemePageMarginBottom = isset($_POST['topThemePageMarginBottom']) ? (int) sanitize_text_field($_POST['topThemePageMarginBottom']) : 0;
                $topThemePageMarginLeft = isset($_POST['topThemePageMarginLeft']) ? (int) sanitize_text_field($_POST['topThemePageMarginLeft']) : 0;
                $topThemeShowFront = isset($_POST['topThemeShowFront']) ? true : false;
                $topThemeShowSingle = isset($_POST['topThemeShowSingle']) ? true : false;
                $topThemeShowPage = isset($_POST['topThemeShowPage']) ? true : false;
                $topThemeShowArchive = isset($_POST['topThemeShowArchive']) ? true : false;
                $topThemeShowAttachment = isset($_POST['topThemeShowAttachment']) ? true : false;

                $saveArr['topThemeSingleMarginArr'] = array($topThemeSingleMarginTop, $topThemeSingleMarginRight, $topThemeSingleMarginBottom, $topThemeSingleMarginLeft);
                $saveArr['topThemePageMarginArr'] = array($topThemePageMarginTop, $topThemePageMarginRight, $topThemePageMarginBottom, $topThemePageMarginLeft);
                $saveArr['topThemeShowArr'] = array(
                    'front' => $topThemeShowFront,
                    'single' => $topThemeShowSingle,
                    'page' => $topThemeShowPage,
                    'archive' => $topThemeShowArchive,
                    'attachment' => $topThemeShowAttachment
                );

            } elseif ($type === 'bottom') {

                $bottomThemeSingleMarginTop = isset($_POST['bottomThemeSingleMarginTop']) ? (int) sanitize_text_field($_POST['bottomThemeSingleMarginTop']) : 0;
                $bottomThemeSingleMarginRight = isset($_POST['bottomThemeSingleMarginRight']) ? (int) sanitize_text_field($_POST['bottomThemeSingleMarginRight']) : 0;
                $bottomThemeSingleMarginBottom = isset($_POST['bottomThemeSingleMarginBottom']) ? (int) sanitize_text_field($_POST['bottomThemeSingleMarginBottom']) : 0;
                $bottomThemeSingleMarginLeft = isset($_POST['bottomThemeSingleMarginLeft']) ? (int) sanitize_text_field($_POST['bottomThemeSingleMarginLeft']) : 0;
                $bottomThemePageMarginTop = isset($_POST['bottomThemePageMarginTop']) ? (int) sanitize_text_field($_POST['bottomThemePageMarginTop']) : 0;
                $bottomThemePageMarginRight = isset($_POST['bottomThemePageMarginRight']) ? (int) sanitize_text_field($_POST['bottomThemePageMarginRight']) : 0;
                $bottomThemePageMarginBottom = isset($_POST['bottomThemePageMarginBottom']) ? (int) sanitize_text_field($_POST['bottomThemePageMarginBottom']) : 0;
                $bottomThemePageMarginLeft = isset($_POST['bottomThemePageMarginLeft']) ? (int) sanitize_text_field($_POST['bottomThemePageMarginLeft']) : 0;
                $bottomThemeShowFront = isset($_POST['bottomThemeShowFront']) ? true : false;
                $bottomThemeShowSingle = isset($_POST['bottomThemeShowSingle']) ? true : false;
                $bottomThemeShowPage = isset($_POST['bottomThemeShowPage']) ? true : false;
                $bottomThemeShowArchive = isset($_POST['bottomThemeShowArchive']) ? true : false;
                $bottomThemeShowAttachment = isset($_POST['bottomThemeShowAttachment']) ? true : false;

                $saveArr['bottomThemeSingleMarginArr'] = array($bottomThemeSingleMarginTop, $bottomThemeSingleMarginRight, $bottomThemeSingleMarginBottom, $bottomThemeSingleMarginLeft);
                $saveArr['bottomThemePageMarginArr'] = array($bottomThemePageMarginTop, $bottomThemePageMarginRight, $bottomThemePageMarginBottom, $bottomThemePageMarginLeft);
                $saveArr['bottomThemeShowArr'] = array(
                    'front' => $bottomThemeShowFront,
                    'single' => $bottomThemeShowSingle,
                    'page' => $bottomThemeShowPage,
                    'archive' => $bottomThemeShowArchive,
                    'attachment' => $bottomThemeShowAttachment
                );

            }



            // --------------------------------------------------
            //   Update Option
            // --------------------------------------------------

            $this->instanceModel->updateOptions($saveArr);

            $returnArr['saveArr'] = $saveArr;


        } catch (Exception $e) {

            $returnArr['error'] = true;

        }


        // --------------------------------------------------
        //   Output
        // --------------------------------------------------

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($returnArr);

        exit();

    }



    public function ajaxMoveEditTab()
    {

        $returnArr = array();
        $returnArr['error'] = false;


        try {


            // --------------------------------------------------
            //   Validation & Set Value
            // --------------------------------------------------

            if (empty($_POST['themeNameId'])) {
                throw new Exception('empty');
            }

            $themeNameId = sanitize_text_field($_POST['themeNameId']);

            $tempArr = explode('-', $themeNameId);
            $name = $tempArr[0];
            $id = $tempArr[1];

            if (!ctype_alnum($name) || !ctype_alnum($id)) {
                throw new Exception('alnum');
            }

            if (mb_strlen($name) > 20 || mb_strlen($id) !== 8) {
                throw new Exception('strlen');
            }


            // --------------------------------------------------
            //   Get Edit Themes Arr
            // --------------------------------------------------

            $instanceModel = new Game_Users_Share_Buttons_Model();
            $editThemesArr = $instanceModel->getEditThemesArr();

            if (in_array($themeNameId, $editThemesArr)) {
                throw new Exception('already');
            }


            // --------------------------------------------------
            //   Set Path
            // --------------------------------------------------

            define(
                'THEME_DIRECTORY_URL',
                GAME_USERS_SHARE_BUTTONS_URL . "react/contents/app/share-buttons/themes-design/{$themeNameId}/"
            );

            $directoryPath = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'themes' . DIRECTORY_SEPARATOR . $themeNameId;
            $dataJsonPath = $directoryPath . DIRECTORY_SEPARATOR . 'data.json';


            // --------------------------------------------------
            //   Save Data JSON
            // --------------------------------------------------

            $filePath = THEME_DIRECTORY_URL . 'data.json';
            $fileData = wp_remote_get($filePath);

            if (!is_wp_error($fileData) && $fileData['response']['code'] === 200 ) {

                $dataJson = $fileData['body'];

                if (!file_exists($directoryPath)) {
                    if(!mkdir($directoryPath)) {
                        throw new Exception('directory1');
                    }
                }

                file_put_contents($dataJsonPath, $dataJson);

            } else {
                throw new Exception('dataJson');
            }


            // --------------------------------------------------
            //   Save Images
            // --------------------------------------------------

            $dataArr = json_decode($dataJson, true);

            foreach ($dataArr['share'] as $key => $value) {

                $filePath = THEME_DIRECTORY_URL . "{$key}.{$value['extension']}";
                $fileData = wp_remote_get($filePath);

                if (!is_wp_error($fileData) && $fileData['response']['code'] === 200 ) {
                    $imagePath = $directoryPath . DIRECTORY_SEPARATOR . "{$key}.{$value['extension']}";
                    file_put_contents($imagePath, $fileData['body']);
                } else {
                    throw new Exception('images');
                }

            }


            // --------------------------------------------------
            //   Save Free Upload Image
            // --------------------------------------------------

            if ($dataArr['freeUploadImage'] && $dataArr['freeUploadImageExtension']) {

                $filePath = THEME_DIRECTORY_URL . "free.{$dataArr['freeUploadImageExtension']}";
                $fileData = wp_remote_get($filePath);

                if (!is_wp_error($fileData) && $fileData['response']['code'] === 200 ) {
                    $imagePath = $directoryPath . DIRECTORY_SEPARATOR . "free.{$dataArr['freeUploadImageExtension']}";
                    file_put_contents($imagePath, $fileData['body']);
                } else {
                    throw new Exception('free upload images');
                }

            }


            // --------------------------------------------------
            //   Copy Theme
            // --------------------------------------------------

            $pathDest = GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_THEMES . DIRECTORY_SEPARATOR . $themeNameId;
            Game_Users_Share_Buttons::copyDirectory($directoryPath, $pathDest);


            // --------------------------------------------------
            //   Update Option
            // --------------------------------------------------

            array_unshift($editThemesArr, $themeNameId);

            $instanceModel->updateOption('editThemesArr', $editThemesArr);


            // --------------------------------------------------
            //   Set Return Data
            // --------------------------------------------------

            $returnArr['editThemesArr'] = $editThemesArr;


        } catch (Exception $e) {

            $returnArr['error'] = true;
            $returnArr['errorMessage'] = 'Error Message: ' . $e->getMessage();

        }


        // --------------------------------------------------
        //   Output
        // --------------------------------------------------

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($returnArr);

        exit();

    }


    public function ajaxSaveOption()
    {

        $returnArr = array();
        $returnArr['error'] = false;


        try {


            // --------------------------------------------------
            //   Validation & Set Value
            // --------------------------------------------------

            $jsonArr = array();

            $jsonArr['queryControlCache'] = mt_rand(10000000, 99999999);

            if (isset($_POST['php']) && $_POST['php'] == 1) {
                $jsonArr['php'] = 1;
            } else {
                $jsonArr['php'] = 0;
            }

            if (isset($_POST['twitterApiType']) && $_POST['twitterApiType'] === 'digitiminimi.com/count.jsoon') {
                $jsonArr['twitterApiType'] = 'digitiminimi.com/count.jsoon';
            } else {
                $jsonArr['twitterApiType'] = '';
            }

            if (isset($_POST['rssUrl']) && preg_match('/^(http|https):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i', $_POST['rssUrl'])) {
                $jsonArr['rssUrl'] = esc_url($_POST['rssUrl']);
            } else {
                $jsonArr['rssUrl'] = '';
            }


            // --------------------------------------------------
            //   Save Option Json
            // --------------------------------------------------

            $path = dirname(__FILE__) . '/json/option.json';
            $encodedJson = json_encode($jsonArr);

            if (!file_put_contents($path, $encodedJson)) {
                throw new Exception('optionJson');
            }

            copy($path, GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_JSON_OPTION_JSON);


            // --------------------------------------------------
            //   Update Option
            // --------------------------------------------------

            $instanceModel = new Game_Users_Share_Buttons_Model();
            $instanceModel->updateOption('php', $jsonArr['php']);
            $instanceModel->updateOption('twitterApiType', $jsonArr['twitterApiType']);
            $instanceModel->updateOption('rssUrl', $jsonArr['rssUrl']);


        } catch (Exception $e) {

            $returnArr['error'] = true;

        }


        // --------------------------------------------------
        //   Output
        // --------------------------------------------------

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($returnArr);

        exit();

    }


    public function ajaxChangePlan()
    {

        $returnArr = array();
        $returnArr['error'] = false;


        try {


            // --------------------------------------------------
            //   Validation & Set Value
            // --------------------------------------------------

            if (empty($_POST['plan']) || ($_POST['plan'] !== 'free' && $_POST['plan'] !== 'premium' && $_POST['plan'] !== 'business')) {
                throw new Exception('error');
            } else {
                $plan = sanitize_text_field($_POST['plan']);
            }


            // --------------------------------------------------
            //   Update Option
            // --------------------------------------------------

            $instanceModel = new Game_Users_Share_Buttons_Model();
            $instanceModel->updateOption('plan', $plan);


        } catch (Exception $e) {

            $returnArr['error'] = true;

        }


        // --------------------------------------------------
        //   Output
        // --------------------------------------------------

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($returnArr);

        exit();

    }



    /**
     * ディレクトリーをコピーする、中のファイルも
     * @param  string $pathSource コピー元ファイルへのパス
     * @param  string $pathDest   コピー先のパス
     */
    public static function copyDirectory($pathSource, $pathDest)
    {
        if (!is_dir($pathDest)) {
            mkdir($pathDest);
        }

        if (is_dir($pathSource)) {
            if ($dh = opendir($pathSource)) {
                while (($file = readdir($dh)) !== false) {
                    if ($file == "." || $file == "..") {
                        continue;
                    }
                    if (is_dir($pathSource . DIRECTORY_SEPARATOR . $file)) {
                        Game_Users_Share_Buttons::copyDirectory($pathSource . DIRECTORY_SEPARATOR . $file, $pathDest . DIRECTORY_SEPARATOR . $file);
                    } else {
                        copy($pathSource . DIRECTORY_SEPARATOR . $file, $pathDest . DIRECTORY_SEPARATOR . $file);
                    }
                }
                closedir($dh);
            }
        }
    }


    /**
     * ディレクトリーを削除する、中のファイルも
     * @param  string $path パス
     */
    public static function deleteDirectory($path) {
        if (!$dh = @opendir($path)) return;

        while (false !== ($obj = readdir($dh))) {
            if ($obj=='.' || $obj=='..') continue;
            if (!@unlink($path.'/'.$obj)) Game_Users_Share_Buttons::deleteDirectory($path.'/'.$obj, true);
        }

        closedir($dh);
        @rmdir($path);
    }



    // --------------------------------------------------
    //    Plugin Activate / Deactivate / Uninstall
    // --------------------------------------------------

    public function activate()
    {

        // --------------------------------------------------
        //   Initialize Option
        // --------------------------------------------------

        $gameUsersShareButtonsModel = new Game_Users_Share_Buttons_Model();
        $gameUsersShareButtonsModel->initializeOption();


        // --------------------------------------------------
        //   Make game-users-share-buttons Directory
        // --------------------------------------------------

        if (!file_exists(GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT)) {
            mkdir(GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT);
        }


        // --------------------------------------------------
        //   Make Json Directory
        // --------------------------------------------------

        if (!file_exists(GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_JSON)) {
            mkdir(GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_JSON);
        }


        // --------------------------------------------------
        //   Save Option Json
        // --------------------------------------------------

        $optionArr = $gameUsersShareButtonsModel->getOptionArr();

        $jsonArr = array();
        $jsonArr['queryControlCache'] = mt_rand(10000000, 99999999);
        $jsonArr['php'] = $optionArr['php'];
        $jsonArr['twitterApiType'] = $optionArr['twitterApiType'];
        $jsonArr['rssUrl'] = $optionArr['rssUrl'];

        $path = dirname(__FILE__) . '/json/option.json';
        $encodedJson = json_encode($jsonArr);

        file_put_contents($path, $encodedJson);
        copy($path, GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_JSON_OPTION_JSON);


        // --------------------------------------------------
        //   Make Themes Directory
        // --------------------------------------------------

        if (!file_exists(GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_THEMES)) {
            mkdir(GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_THEMES);
        }

    }

    public function deactivate()
    {

    }

    public static function uninstall()
    {
        $gameUsersShareButtonsModel = new Game_Users_Share_Buttons_Model();
        $gameUsersShareButtonsModel->deleteOption();

        Game_Users_Share_Buttons::deleteDirectory(GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT);
    }


    // --------------------------------------------------
    //    Plugin Upgrade
    // --------------------------------------------------

    public function upgradeCompleted($upgraderObject, $options)
    {
        // The path to our plugin's main file
        $pluginBaseName = plugin_basename(__FILE__);

        // If an update has taken place and the updated type is plugins and the plugins element exists
        if ($options['action'] === 'update' && $options['type'] === 'plugin' && isset($options['plugins'])) {

            // Iterate through the plugins being updated and check if ours is there
            foreach($options['plugins'] as $plugin) {

                if ($plugin === $pluginBaseName) {

                    $pathJson = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'json';
                    Game_Users_Share_Buttons::copyDirectory(GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_JSON, $pathJson);

                    $pathThemes = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'themes';
                    Game_Users_Share_Buttons::copyDirectory(GAME_USERS_SHARE_BUTTONS_PLUGIN_PATH_WP_CONTENT_THEMES, $pathThemes);

                }
            }
        }
    }


}

$gameUsersShareButtons = new Game_Users_Share_Buttons();
