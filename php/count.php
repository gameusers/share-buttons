<?php

ini_set('display_errors', 0);

try {

    $returnArr = array();

    if (empty($_GET['type']) && empty($_GET['url'])) {
        throw new Exception();
    }

    $type = $_GET['type'];
    $url = $_GET['url'];

    if ($type === 'pocket') {

        $apiUrl = 'https://widgets.getpocket.com/v1/button?v=1&count=horizontal&url=' . $url . '&src=' . $url;
        $html = file_get_contents($apiUrl);
        $dom = new DOMDocument('1.0', 'UTF-8');
        $dom->preserveWhiteSpace = false;
        $dom->loadHTML($html);
        $xpath = new DOMXPath($dom);
        $result = $xpath->query('//em[@id = "cnt"]')->item(0);

        if (isset($result->nodeValue)) {
            $count = $result->nodeValue;
        } else {
            throw new Exception();
        }

    } else if ($type === 'feedly') {

        $apiUrl = 'http://cloud.feedly.com/v3/feeds/feed%2F' . urlencode($url);
        $json = file_get_contents($apiUrl);
        $arr = json_decode($json, true);

        if (isset($arr['subscribers'])) {
            $count = $arr['subscribers'];
        } else {
            throw new Exception();
        }

    } else {
        throw new Exception();
    }


    $returnArr['count'] = preg_replace('/[^0-9]/', '', $count);

} catch (Exception $e) {
    $returnArr['count'] = null;
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($returnArr);
