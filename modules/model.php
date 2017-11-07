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
        $this->databaseTableName = $wpdb->prefix . 'gameusers_share_buttons';

        $this->optionArr = get_site_option('gameusers_option');

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
                'databaseVersion' => 1,
                'topTheme' => '',
                'bottomTheme' => '',
                'editThemesArr' => array(),
                'php' => 0,
                'twitterApiType' => '',
                'rssUrl' => '',
                'plan' => 'free',
            );
            update_option('gameusers_option', $tempArr);
        }
    }

    public function updateOption($key, $value)
    {
        $this->optionArr[$key] = $value;
        update_option('gameusers_option', $this->optionArr);
    }

    public function deleteOption()
    {
        delete_option('gameusers_option');
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
