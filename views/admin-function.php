<script type="text/javascript">
var gameUsersShareButtonsPageType = 'wordPressPlugin';

function gameUsersShareButtonsAdminAjaxUrl() {
  var url = '<?php echo admin_url('admin-ajax.php'); ?>';
  return url;
}

function gameUsersShareButtonsPluginUrl() {
  var url = '<?php echo plugins_url() . '/game-users-share-buttons/'; ?>';
  return url;
}

function gameUsersShareButtonsAdminOptionObj() {
  var json = '<?php echo json_encode($this->optionArr, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT); ?>';
  return JSON.parse(json);
}
</script>
