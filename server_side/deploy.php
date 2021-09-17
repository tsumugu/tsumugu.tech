<?php
if ($_GET["k"] !== "[API Key]") {
  exit;
}
$git = "cd /var/www/release/; sudo /usr/bin/git fetch origin master; sudo /usr/bin/git reset --hard origin/master 2>&1";
$build_cmd = "cd /var/www/release/; sudo /usr/local/bin/npm run build; cp -r /var/www/release/dist/* /var/www/html 2>&1";
exec($git, $array);
exec($build_cmd, $array2);
if (in_array("  Build complete.", $array2)) {
  $status = "true,true";
} else {
  $status = "true,false";
}
$notice_cmd = "/usr/bin/php /var/www/notice/send.php ".$status." 2>&1";
exec($notice_cmd, $array3);