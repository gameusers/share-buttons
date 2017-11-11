<?php

class Game_Users_Share_Buttons_Option
{

    private $optionArr = array();


    public function option($optionArr)
    {
        $this->optionArr = $optionArr;

        add_options_page(
            'Game Users Share Buttons Setting', // page_title（オプションページのHTMLのタイトル）
            'Game Users Share Buttons', // menu_title（メニューで表示されるタイトル）
            'administrator', // capability
            'game-users-share-buttons', // menu_slug（URLのスラッグこの例だとoptions-general.php?game-users-share-buttons）
            array($this, 'viewOption') // function
        );
    }

    public function viewOption()
    {
        include_once dirname(__FILE__) . '../../views/option.php';
    }

    public function jsFunctionAdmin($optionArr)
    {
        $this->optionArr = $optionArr;

        include_once dirname(__FILE__) . '../../views/admin-function.php';
    }

}
