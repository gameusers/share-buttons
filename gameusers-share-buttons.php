<?php
/*
Plugin Name: Game Users Share Buttons
Plugin URI: https://gameusers.org/app/share-buttons
Description: Twitter、Facebook、Google+など（全10サイト）のシェアボタンが利用できるようになるプラグインです。自由度の高いカスタマイズが行え、他にないオリジナルのシェアボタンを作成できます。設定 > Game Users Share Buttons を開いてシェアボタンを作成・編集してください。
Version: 1.0.0
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

// define('GAMEUSERS_SHARE_BUTTONS_URL', 'http://localhost/gameusers/public/');
define('GAMEUSERS_SHARE_BUTTONS_URL', 'https://gameusers.org/');

define('GAMEUSERS_SHARE_BUTTONS_DATABASE_VERSION', 1);
define('GAMEUSERS_SHARE_BUTTONS_IMAGE_ALT', 'Game Users');
define('GAMEUSERS_SHARE_BUTTONS_PLUGIN_URL', plugins_url('gameusers-share-buttons'));



class Game_Users_Share_Buttons
{

    // --------------------------------------------------
    //   Property
    // --------------------------------------------------

    public static $shareArr = array(
        'twitter' => array('name' => 'Twitter', 'count' => true),
        'facebook' => array('name' => 'Facebook', 'count' => true),
        'google-plus' => array('name' => 'Google+', 'count' => true),
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
        //   Model
        // --------------------------------------------------

        $instanceModel = new Game_Users_Share_Buttons_Model();
        $this->optionArr = $instanceModel->getOptionArr();


        // --------------------------------------------------
        //   Plugin Activation
        // --------------------------------------------------

        register_activation_hook(__FILE__, array( $this, 'activate' ));
        register_deactivation_hook(__FILE__, array( $this, 'deactivate' ));
        register_uninstall_hook(__FILE__, 'Game_Users_Share_Buttons::uninstall');


        // --------------------------------------------------
        //   Content Page
        // --------------------------------------------------

        add_action('wp_enqueue_scripts', array( $this, 'head' ));
        add_filter('the_content', array( $this, 'view' ));


        // --------------------------------------------------
        //   Admin Option Page
        // --------------------------------------------------

        add_action('admin_enqueue_scripts', array( $this, 'optionHead' ));
        add_action('admin_menu', array( $this, 'optionView' ));


        // --------------------------------------------------
        //    Ajax
        // --------------------------------------------------

        add_action('wp_ajax_gameusers_share_buttons_ajax_save_theme', array( $this, 'ajaxSaveTheme' ));
        add_action('wp_ajax_gameusers_share_buttons_ajax_delete_theme', array( $this, 'ajaxDeleteTheme' ));
        add_action('wp_ajax_gameusers_share_buttons_ajax_set_top_bottom_theme', array( $this, 'ajaxSetTopBottomTheme' ));
        add_action('wp_ajax_gameusers_share_buttons_ajax_move_edit_tab', array( $this, 'ajaxMoveEditTab' ));
        add_action('wp_ajax_gameusers_share_buttons_ajax_save_option', array( $this, 'ajaxSaveOption' ));
        add_action('wp_ajax_gameusers_share_buttons_ajax_change_plan', array( $this, 'ajaxChangePlan' ));

    }



    // --------------------------------------------------
    //   Share Buttons Code
    // --------------------------------------------------

    public static function code($themeNameId)
    {
        $escValue = esc_attr($themeNameId);
        return '<div id="gameusers-share-buttons" data-theme="' . $escValue . '"></div>';
    }


    // --------------------------------------------------
    //   Content Page
    // --------------------------------------------------

    public function head()
    {
        wp_enqueue_script('gameusers-share', GAMEUSERS_SHARE_BUTTONS_PLUGIN_URL . '/js/share-bundle.min.js', array('jquery'), '1.0.0', true);
    }

    public function view($article)
    {
        $top = $bottom = null;

        if (isset($this->optionArr['topTheme'])) {
            $top = Game_Users_Share_Buttons::code($this->optionArr['topTheme']);
        }

        if (isset($this->optionArr['bottomTheme'])) {
            $bottom = Game_Users_Share_Buttons::code($this->optionArr['bottomTheme']);
        }

        return "{$top}{$article}{$bottom}";
    }


    // --------------------------------------------------
    //   Admin Option Page
    // --------------------------------------------------

    public function optionHead($hook)
    {
        if ($hook === 'settings_page_gameusers-share-buttons') {

            wp_deregister_script('jquery');
            wp_enqueue_script('jquery', GAMEUSERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/jquery/jquery.min.js', array(), '3.2.1');
            wp_enqueue_script('jquery-ui-sortable');
            wp_enqueue_style('jquery-confirm', GAMEUSERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/jquery/confirm/jquery-confirm.min.css', array(), '3.3.2');
            wp_enqueue_script('jquery-confirm', GAMEUSERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/jquery/confirm/jquery-confirm.min.js', array('jquery'), '3.3.2');

            wp_enqueue_style('bootstrap', GAMEUSERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/bootstrap/bootstrap.min.css', array(), '3.3.7');
            wp_enqueue_style('ladda-bootstrap', GAMEUSERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/bootstrap/ladda/ladda-themeless.min.css', array(), '0.9.4');
            wp_enqueue_script('ladda-bootstrap-spin', GAMEUSERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/bootstrap/ladda/spin.min.js', array(), '0.9.4');
            wp_enqueue_script('ladda-bootstrap', GAMEUSERS_SHARE_BUTTONS_PLUGIN_URL . '/lib/bootstrap/ladda/ladda.min.js', array(), '0.9.4');

            wp_enqueue_script('gameusers-option', GAMEUSERS_SHARE_BUTTONS_PLUGIN_URL . '/js/option-bundle.min.js', array('jquery'), '1.0.0', true);

            $instanceOption = new Game_Users_Share_Buttons_Option();
            $instanceOption->jsFunctionAdmin($this->optionArr);

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
                    } else if ($mimeType === 'image/jpeg') {
                        $extension = 'jpg';
                    } else if ($mimeType === 'image/png') {
                        $extension = 'png';
                    } else if ($mimeType === 'image/svg+xml') {
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
            $directoryPath = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'themes' . DIRECTORY_SEPARATOR . $themeNameId;


            // --------------------------------------------------
            //   Delete Directory
            // --------------------------------------------------

            if (is_dir($directoryPath) and !is_link($directoryPath)) {
                array_map('rmrf', glob($directoryPath . DIRECTORY_SEPARATOR . '*', GLOB_ONLYDIR));
                array_map('unlink', glob($directoryPath . DIRECTORY_SEPARATOR . '*'));
                rmdir($directoryPath);
            }


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

            } else if ($type === 'top') {

                $instanceModel->updateOption('topTheme', $themeNameId);
                $returnArr['top'] = $themeNameId;

            } else if ($type === 'bottom' && ($bottomTheme === $themeNameId || $themeNameId === null)) {

                $instanceModel->updateOption('bottomTheme', null);
                $returnArr['bottom'] = '';

            } else if ($type === 'bottom') {

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

            define('THEME_DIRECTORY_URL', GAMEUSERS_SHARE_BUTTONS_URL . 'react/contents/app/share-buttons/themes-design/' . $themeNameId . '/');
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

            if (!file_put_contents($path, json_encode($jsonArr))) {
                throw new Exception('optionJson');
            }


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



    // --------------------------------------------------
    //    Plugin Activate / Deactivate / Uninstall
    // --------------------------------------------------

    public function activate()
    {
        $gameUsersShareButtonsModel = new Game_Users_Share_Buttons_Model();
        $gameUsersShareButtonsModel->initializeOption();
    }

    public function deactivate()
    {

    }

    public static function uninstall()
    {
        $gameUsersShareButtonsModel = new Game_Users_Share_Buttons_Model();
        $gameUsersShareButtonsModel->deleteOption();
    }


}

$gameUsersShareButtons = new Game_Users_Share_Buttons();
