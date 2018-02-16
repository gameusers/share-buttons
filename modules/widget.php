<?php

/**
 * Widget
 * 参考：https://increment-log.com/widget-create-summary/
 */
class Game_Users_Share_Buttons_Widget extends WP_Widget
{

    private $editThemesArr = array();


    /**
     * コンストラクター
     */
    public function __construct($argsArr) {

        $this->editThemesArr = $argsArr['editThemesArr'];

        $widgetOptions = array(
            'classname' => 'widget-game-users-share-buttons',
            'description' => 'Game Users Share Buttonsのウィジェット',
            'customize_selective_refresh' => false,
        );

        parent::__construct('game-users-share-buttons', 'Game Users Share Buttons', $widgetOptions);

    }


    /**
     * ウィジェットの内容をWebページに出力（HTML表示）する。
     * @param  array $argsArr     register_sidebar()で登録したウィジェット用の値が返ってくる
     * @param  array $instanceArr ウィジェットの管理画面で入力したオプションの値が返ってくる
     */
    public function widget($argsArr, $instanceArr) {


        // --------------------------------------------------
        //   Show
        // --------------------------------------------------

        $showFront = isset($instanceArr['showFront']) ? $instanceArr['showFront'] : false;
        $showSingle = isset($instanceArr['showSingle']) ? $instanceArr['showSingle'] : false;
        $showPage = isset($instanceArr['showPage']) ? $instanceArr['showPage'] : false;
        $showArchive = isset($instanceArr['showArchive']) ? $instanceArr['showArchive'] : false;
        $showAttachment = isset($instanceArr['showAttachment']) ? $instanceArr['showAttachment'] : false;


        $show = false;

        if ($showFront && GAME_USERS_SHARE_BUTTONS_PLUGIN_IS_FRONT) {
            $show = true;
        } elseif ($showSingle && GAME_USERS_SHARE_BUTTONS_PLUGIN_IS_SINGLE && ! GAME_USERS_SHARE_BUTTONS_PLUGIN_IS_ATTACHMENT) {
            $show = true;
        } elseif ($showPage && GAME_USERS_SHARE_BUTTONS_PLUGIN_IS_PAGE && ! GAME_USERS_SHARE_BUTTONS_PLUGIN_IS_ATTACHMENT) {
            $show = true;
        } elseif ($showArchive && GAME_USERS_SHARE_BUTTONS_PLUGIN_IS_ARCHIVE) {
            $show = true;
        } elseif ($showAttachment && GAME_USERS_SHARE_BUTTONS_PLUGIN_IS_ATTACHMENT) {
            $show = true;
        }



        // --------------------------------------------------
        //   Output
        // --------------------------------------------------

        if ($show) {


            // --------------------------------------------------
            //   Set Value
            // --------------------------------------------------

            $escTitle = empty($instanceArr['title']) ? '' : esc_attr($instanceArr['title']);

            $selectedShareButtons = empty($instanceArr['selectedShareButtons']) ? '' : $instanceArr['selectedShareButtons'];

            $marginTop = isset($instanceArr['marginTop']) ? (int) $instanceArr['marginTop'] : 0;
            $marginRight = isset($instanceArr['marginRight']) ? (int) $instanceArr['marginRight'] : 0;
            $marginBottom = isset($instanceArr['marginBottom']) ? (int) $instanceArr['marginBottom'] : 0;
            $marginLeft = isset($instanceArr['marginLeft']) ? (int) $instanceArr['marginLeft'] : 0;

            $shareButtonsCode = Game_Users_Share_Buttons::code($selectedShareButtons, array($marginTop, $marginRight, $marginBottom, $marginLeft));


            // --------------------------------------------------
            //   Code
            // --------------------------------------------------

            echo $argsArr['before_widget'];

            if ($escTitle) {
                echo $argsArr['before_title'];
                echo $escTitle;
                echo $argsArr['after_title'];
            }

            echo $shareButtonsCode;
            echo $argsArr['after_widget'];

            wp_enqueue_script('game-users-share', GAME_USERS_SHARE_BUTTONS_PLUGIN_URL . '/js/share-bundle.min.js', array('jquery'), '1.3.0', true);

        }

    }


    /**
     * 管理画面のウィジェット設定フォームを出力する。
     * @param  array $instanceArr 現在のオプション値
     */
    public function form($instanceArr) {


        // --------------------------------------------------
        //   デフォルトの値を設定
        // --------------------------------------------------

        $defaultArr = array(
            'title' => 'Share Buttons',
            'selectedShareButtons' => '',
            'marginTop' => 0,
            'marginRight' => 0,
            'marginBottom' => 0,
            'marginLeft' => 0,
            'showFront' => false,
            'showSingle' => false,
            'showPage' => false,
            'showArchive' => false,
            'showAttachment' => false
        );


        // --------------------------------------------------
        //   デフォルトのオプション値と現在のオプション値を結合
        // --------------------------------------------------

        $instanceArr = wp_parse_args((array) $instanceArr, $defaultArr);


        // --------------------------------------------------
        //   Title
        // --------------------------------------------------

        $titleFieldId = $this->get_field_id('title');
        $titleFieldName = $this->get_field_name('title');
        $escTitle = esc_attr($instanceArr['title']);


        // --------------------------------------------------
        //   Share Buttons
        // --------------------------------------------------

        $selectedShareButtonsFieldId = $this->get_field_id('selectedShareButtons');
        $selectedShareButtonsFieldName = $this->get_field_name('selectedShareButtons');
        $selectedShareButtons = $instanceArr['selectedShareButtons'];


        // --------------------------------------------------
        //   Margin
        // --------------------------------------------------

        $marginTopFieldId = $this->get_field_id('marginTop');
        $marginTopFieldName = $this->get_field_name('marginTop');
        $escMarginTop = esc_attr($instanceArr['marginTop']);

        $marginRightFieldId = $this->get_field_id('marginRight');
        $marginRightFieldName = $this->get_field_name('marginRight');
        $escMarginRight = esc_attr($instanceArr['marginRight']);

        $marginBottomFieldId = $this->get_field_id('marginBottom');
        $marginBottomFieldName = $this->get_field_name('marginBottom');
        $escMarginBottom = esc_attr($instanceArr['marginBottom']);

        $marginLeftFieldId = $this->get_field_id('marginLeft');
        $marginLeftFieldName = $this->get_field_name('marginLeft');
        $escMarginLeft = esc_attr($instanceArr['marginLeft']);


        // --------------------------------------------------
        //   Show
        // --------------------------------------------------

        $showFrontFieldId = $this->get_field_id('showFront');
        $showFrontFieldName = $this->get_field_name('showFront');
        $showFrontChecked = $instanceArr['showFront'] ? ' checked' : '';

        $showSingleFieldId = $this->get_field_id('showSingle');
        $showSingleFieldName = $this->get_field_name('showSingle');
        $showSingleChecked = $instanceArr['showSingle'] ? ' checked' : '';

        $showPageFieldId = $this->get_field_id('showPage');
        $showPageFieldName = $this->get_field_name('showPage');
        $showPageChecked = $instanceArr['showPage'] ? ' checked' : '';

        $showArchiveFieldId = $this->get_field_id('showArchive');
        $showArchiveFieldName = $this->get_field_name('showArchive');
        $showArchiveChecked = $instanceArr['showArchive'] ? ' checked' : '';

        $showAttachmentFieldId = $this->get_field_id('showAttachment');
        $showAttachmentFieldName = $this->get_field_name('showAttachment');
        $showAttachmentChecked = $instanceArr['showAttachment'] ? ' checked' : '';


        // --------------------------------------------------
        //   Code
        // --------------------------------------------------

        ?>
        <p>
          <label for="<?php echo $titleFieldId; ?>">タイトル:</label>
          <input class="widefat" id="<?php echo $titleFieldId; ?>" name="<?php echo $titleFieldName; ?>" type="text" value="<?php echo $escTitle; ?>" />
        </p>


        <p>
          <label for="<?php echo $selectedShareButtonsFieldId; ?>">表示するシェアボタン:</label><br>
          <select id="<?php echo $selectedShareButtonsFieldId; ?>" name="<?php echo $selectedShareButtonsFieldName; ?>">
            <?php
            foreach ($this->editThemesArr as $key => $value) {
                $selected = '';
                if ($selectedShareButtons === $value) {
                    $selected = ' selected';
                }

                $escValue = esc_attr($value);
                echo "<option value=\"${escValue}\"${selected}>${escValue}</option>";
            }
            ?>
          </select>
        </p>


        <p>
          <label for="<?php echo $marginTopFieldId; ?>">余白 上:</label>
          <input class="widefat" id="<?php echo $marginTopFieldId; ?>" name="<?php echo $marginTopFieldName; ?>" type="text" value="<?php echo $escMarginTop; ?>" />
        </p>

        <p>
          <label for="<?php echo $marginRightFieldId; ?>">余白 右:</label>
          <input class="widefat" id="<?php echo $marginRightFieldId; ?>" name="<?php echo $marginRightFieldName; ?>" type="text" value="<?php echo $escMarginRight; ?>" />
        </p>

        <p>
          <label for="<?php echo $marginBottomFieldId; ?>">余白 下:</label>
          <input class="widefat" id="<?php echo $marginBottomFieldId; ?>" name="<?php echo $marginBottomFieldName; ?>" type="text" value="<?php echo $escMarginBottom; ?>" />
        </p>

        <p>
          <label for="<?php echo $showFrontFieldId; ?>">余白 左:</label>
          <input class="widefat" id="<?php echo $marginLeftFieldId; ?>" name="<?php echo $marginLeftFieldName; ?>" type="text" value="<?php echo $escMarginLeft; ?>" />
        </p>

        <strong>表示するページ</strong>
        <p>
            <input type="checkbox" id="<?php echo $showFrontFieldId; ?>" name="<?php echo $showFrontFieldName; ?>"<?php echo $showFrontChecked; ?>>
            <label for="<?php echo $showFrontFieldId; ?>">トップページ</label>
        </p>

        <p>
            <input type="checkbox" id="<?php echo $showSingleFieldId; ?>" name="<?php echo $showSingleFieldName; ?>"<?php echo $showSingleChecked; ?>>
            <label for="<?php echo $showSingleFieldId; ?>">個別投稿ページ</label>
        </p>

        <p>
            <input type="checkbox" id="<?php echo $showPageFieldId; ?>" name="<?php echo $showPageFieldName; ?>"<?php echo $showPageChecked; ?>>
            <label for="<?php echo $showPageFieldId; ?>">固定ページ</label>
        </p>

        <p>
            <input type="checkbox" id="<?php echo $showArchiveFieldId; ?>" name="<?php echo $showArchiveFieldName; ?>"<?php echo $showArchiveChecked; ?>>
            <label for="<?php echo $showArchiveFieldId; ?>">アーカイブページ（カテゴリー、タグページなど）</label>
        </p>

        <p>
            <input type="checkbox" id="<?php echo $showAttachmentFieldId; ?>" name="<?php echo $showAttachmentFieldName; ?>"<?php echo $showAttachmentChecked; ?>>
            <label for="<?php echo $showAttachmentFieldId; ?>">添付ファイルページ（アップロードしたファイルごとに用意されるページ）</label>
        </p>
        <?php

    }


    /**
     * ウィジェットオプションを安全な値で保存するためにデータ検証＆無害化する。
     * @param  array $newInstanceArr 新しい値が入った配列
     * @param  array $oldInstanceArr 古い値が入った配列
     * @return array                 検証＆エスケープ後の配列を返す
     */
    public function update($newInstanceArr, $oldInstanceArr) {


        // --------------------------------------------------
        //   保存用配列作成
        // --------------------------------------------------

        $instanceArr = $oldInstanceArr;


        // --------------------------------------------------
        //   Title
        // --------------------------------------------------

        $instanceArr['title'] = sanitize_text_field($newInstanceArr['title']);


        // --------------------------------------------------
        //   Selected Share Buttons
        // --------------------------------------------------

        $instanceArr['selectedShareButtons'] = sanitize_text_field($newInstanceArr['selectedShareButtons']);


        // --------------------------------------------------
        //   Margin
        // --------------------------------------------------

        $instanceArr['marginLeft'] = (int) $newInstanceArr['marginLeft'];
        $instanceArr['marginLeft'] = (int) $newInstanceArr['marginLeft'];
        $instanceArr['marginLeft'] = (int) $newInstanceArr['marginLeft'];
        $instanceArr['marginLeft'] = (int) $newInstanceArr['marginLeft'];


        // --------------------------------------------------
        //   Show
        // --------------------------------------------------

        $instanceArr['showFront'] = $newInstanceArr['showFront'] ? true : false;
        $instanceArr['showSingle'] = $newInstanceArr['showSingle'] ? true : false;
        $instanceArr['showPage'] = $newInstanceArr['showPage'] ? true : false;
        $instanceArr['showArchive'] = $newInstanceArr['showArchive'] ? true : false;
        $instanceArr['showAttachment'] = $newInstanceArr['showAttachment'] ? true : false;



        return $instanceArr;

    }

}


/**
 * 引数を渡すための一時的なクラス
 * 参考：https://stackoverflow.com/questions/39586672/pass-arguments-to-wp-widget-construct-via-register-widget-action-hook
 */
class Game_Users_Share_Buttons_Temp_Widget extends Game_Users_Share_Buttons_Widget
{
    public function __construct($argsArr) {
        $this->argsArr = $argsArr;
        parent::__construct($this->argsArr);
    }
}
