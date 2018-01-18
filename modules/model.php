<?php

class Game_Users_Share_Buttons_Model
{

    private $databaseTableName = null;
    private $optionArr = null;
    private $databaseVersion = null;
    private $topTheme = null;
    private $bottomTheme = null;
    private $editThemesArr = null;
    private $php = null;
    private $twitterApiType = null;
    private $rssUrl = null;
    private $plan = null;



    public function __construct()
    {
        global $wpdb;
        $this->databaseTableName = $wpdb->prefix . 'game_users_share_buttons';

        $this->optionArr = get_site_option('game_users_option');

        if ($this->optionArr) {
            $this->databaseVersion = (int) $this->optionArr['databaseVersion'];
            $this->topTheme = $this->optionArr['topTheme'];
            $this->bottomTheme = $this->optionArr['bottomTheme'];
            $this->editThemesArr = $this->optionArr['editThemesArr'];
            $this->php = $this->optionArr['php'];
            $this->twitterApiType = $this->optionArr['twitterApiType'];
            $this->rssUrl = $this->optionArr['rssUrl'];
            $this->plan = $this->optionArr['plan'];
        }
    }



    public function initializeOption()
    {
        if (! $this->databaseVersion) {
            $tempArr = array(
                'databaseVersion' => 2,
                'topTheme' => null,
                'topThemeSingleMarginArr' => array(0, 0, 0, 0),
                'topThemePageMarginArr' => array(0, 0, 0, 0),
                'topThemeShowArr' => array(
                    'front' => false,
                    'single' => true,
                    'page' => true,
                    'archive' => false
                ),
                'bottomTheme' => null,
                'bottomThemeSingleMarginArr' => array(0, 0, 0, 0),
                'bottomThemePageMarginArr' => array(0, 0, 0, 0),
                'bottomThemeShowArr' => array(
                    'front' => false,
                    'single' => true,
                    'page' => true,
                    'archive' => false
                ),
                'editThemesArr' => array(),
                'php' => 0,
                'twitterApiType' => '',
                'rssUrl' => '',
                'plan' => 'free',
            );
            update_option('game_users_option', $tempArr);
        }
    }

    public function updateOption($key, $value)
    {
        $this->optionArr[$key] = $value;
        update_option('game_users_option', $this->optionArr);
    }

    public function updateOptions($arr)
    {
        foreach ($arr as $key => $value) {
            $this->optionArr[$key] = $value;
        }

        update_option('game_users_option', $this->optionArr);
    }

    public function deleteOption()
    {
        delete_option('game_users_option');
    }


    public function versionUpOption()
    {
        if ($this->optionArr['databaseVersion'] === 1) {

            $this->optionArr['databaseVersion'] = 2;

            $this->optionArr['topThemeSingleMarginArr'] = array(0, 0, 0, 0);
            $this->optionArr['topThemePageMarginArr'] = array(0, 0, 0, 0);
            $this->optionArr['topThemeShowArr'] = array(
                'front' => false,
                'single' => true,
                'page' => true,
                'archive' => false
            );

            $this->optionArr['bottomThemeSingleMarginArr'] = array(0, 0, 0, 0);
            $this->optionArr['bottomThemePageMarginArr'] = array(0, 0, 0, 0);
            $this->optionArr['bottomThemeShowArr'] = array(
                'front' => false,
                'single' => true,
                'page' => true,
                'archive' => false
            );

            update_option('game_users_option', $this->optionArr);

        }
    }


    public function getOptionArr()
    {
        return $this->optionArr;
    }

    public function getOptionTopBottomTheme()
    {
        return array(
            'topTheme' => $this->topTheme,
            'bottomTheme' => $this->bottomTheme
        );
    }

    public function getEditThemesArr()
    {
        return $this->editThemesArr;
    }

}
