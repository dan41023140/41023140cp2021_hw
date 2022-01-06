var tipuesearch = {"pages": [{'title': 'About', 'text': '這是計算機程式課程 2021 Fall 的作業倉儲與網站 template \n \n 41023140 \n 網站倉儲:\xa0 https://github.com/dan41023140/41023140cp2021_hw \n 網站連結:\xa0 https://dan41023140.github.io/cp2021_hw/content/index.html \n 其他與個人或作業相關資料說明或介紹 testing \n', 'tags': '', 'url': 'About.html'}, {'title': 'HW1', 'text': '\n \n HW1 - 網際動畫與 touch typing 佔學期成績 20%. \n HW1 具體項目成果回報區 \n \n 帳號申請 \n 將 \xa0 https://mde.tw/cp2021/content/Task1.html 程式碼存入個人Gist區 \n 利用鍵盤輸入 https://docs.github.com/en/github/writing-on-github/editing-and-sharing-content-with-gists/creating-gists#about-gists \xa0 中的這段英文內容，輸入內容Gist網址: https://gist.github.com/dan41023140/6115ef946a8079039681169a345e284c \n 利用中文輸入 https://ithelp.ithome.com.tw/articles/10206233 的第一段中文說明，輸入內容網址: https://gist.github.com/dan41023140/9dea068dd900e0397f612fdae581d5e9 \n \n \n \n \n HW1-1 : 將左右碰撞移動的紅色方塊, 改為先移動到水平畫面中心點位置後, 接著上下碰撞移動. \n 程式碼Gist: https://gist.github.com/dan41023140/0b098d57ac20da92d45a6626517ee889 \n HW1-2 : 加入與  Cango 頁面  Fourbar 程式碼相同功能的啟動按鈕, 讓使用者可以利用按鈕啟動或中斷紅色方塊上下碰撞移動. 完成後請將程式碼存入個人 Gist 區. \n 程式碼Gist: https://gist.github.com/dan41023140/9b77e260a9e1edba177effbef1460fab \n \n 程式碼說明: \n HW1-1.py \n Brython browser 模組 \n Brython browser html 模組 \n Brython enable/disable event \n Python 函式定義與呼叫 \n Python 縮排 (indentation) \n 字串 (string) \n 數列 (list) \n if 判斷式 \n 在 Python 關鍵字中, None, True 與 False 第一個字母都必須是大寫 \n 在 python.org 網站範圍搜尋 global 關鍵字 \n 有關 Python 的 global:  https://docs.python.org/3/faq/programming.html#what-are-the-rules-for-local-and-global-variables-in-python \n # 從 browser 導入 html\nfrom browser import html\n# 從 browser 導入 document 並且對應為 doc\nfrom browser import document as doc\n# 導入 browser.timer\nimport browser.timer\n\n# 定義一個 game() 函式\ndef game():\n    """\n利用 global 關鍵字 將 px, py 與 speed \n設為可在函式內改變對應內容 \n(意即, 這三個定義在函式外的全域變數,  \n在函式中分別位於等號左邊)\n    """\n    global px, py, speed\n    ctx.clearRect(px, py, width, height)\n    ctx.fillStyle = "red"\n    if px < canvas.width/2:\n        px += speed\n    else:\n        py -= speed\n    \n    if px < 0 or (px + width) > canvas.width:\n        speed = -speed\n    if py < 0 or (py + height) > canvas.height:\n        speed = -speed\n    \n    ctx.fillRect(px, py, width, height)\n\n"""\na variable declared outside of the function or \nin global scope is known as a global variable. \nThis means that a global variable can be accessed \ninside or outside of the function.\n"""\n\ncanvas = html.CANVAS(width = 600, height = 600)\ncanvas.id = "game-board"\nbrython_div = doc["brython_div"]\nbrython_div <= canvas\nctx = canvas.getContext("2d")\npx = 0\npy = 50\nwidth = 20\nheight = 20\nspeed = 2\n\nbrowser.timer.set_interval(game, 10) \n HW1-2.py \n from browser import document as doc\nfrom browser import timer\nfrom browser import html\nimport math\n\n# 建立 game-board canvas\n\ncanvas = html.CANVAS(width = 300, height = 300)\ncanvas.id = "game-board"\nbrython_div = doc["brython_div"]\nbrython_div <= canvas\nctx = canvas.getContext("2d")\npx = 0\npy = 50\nwidth = 20\nheight = 20\nspeed = 2\n\n# 建立 button\nbrython_div <= html.BUTTON("啟動", id="power")\n \ndef game():\n    global px, py, speed\n    ctx.clearRect(px, py, width, height)\n    ctx.fillStyle = "red"\n    if px < canvas.width/2:\n        px += speed\n    else:\n        py -= speed\n    \n    if px < 0 or (px + width) > canvas.width:\n        speed = -speed\n    if py < 0 or (py + height) > canvas.height:\n        speed = -speed\n    \n    ctx.fillRect(px, py, width, height)\n \n \n# 將 anim 設為 None\nanim = None\n \ndef launchAnimation(ev):\n    global anim\n    # 初始啟動, anim 為 None\n    if anim is None:\n        # 每 0.1 秒執行一次 draw 函式繪圖\n        anim = timer.set_interval(game, 10)\n        # 初始啟動後, 按鈕文字轉為"暫停"\n        doc[\'power\'].text = \'暫停\'\n    elif anim == \'hold\':\n        # 當 anim 為 \'hold\' 表示曾經暫停後的啟動, 因此持續以 set_interval() 持續旋轉, 且將 power 文字轉為"暫停"\n        anim = timer.set_interval(game, 10)\n        doc[\'power\'].text = \'暫停\'\n    else:\n        # 初始啟動後, 使用者再按 power, 此時 anim 非 None 也不是 \'hold\', 因此會執行 clear_interval() 暫停\n        # 且將 anim 變數設為 \'hold\', 且 power 文字轉為"繼續"\n        timer.clear_interval(anim)\n        anim = \'hold\'\n        doc[\'power\'].text = \'繼續\'\n\n \ndoc["power"].bind("click", launchAnimation)\n \n', 'tags': '', 'url': 'HW1.html'}, {'title': 'Token', 'text': '當你建立 Github 帳號後就可以利用 Gist 儲存資料或程式碼, 且可以利用  https://mde.tw/cp2021/content/run.html  來執行 Brython 程式. \n 在 run.html 執行 Brython 程式, 可以使用下列三種方法: \n \n 直接連線至  https://mde.tw/cp2021/content/run.html  將 Brython 程式寫在編輯區, 然後按下 Run. \n 將 Brython 程式存在 Gist, 利用 run.html?src=Gist_URL, run.html 中的 Javascript 就會導入此 Gist 程式執行. \n 將 Brython 程式寫在 run.html 頁面中, 然後安排其中的 Javascript 或 Brython 程式導入執行. \n \n 而上述三種程式的執行若更動 run.html 或取 run.html?src=Gist_URL 連結放入頁面, 都必須要在各自的 cp2021_hw倉儲的動態網站中改版, 轉為靜態網頁內容, 然後新增提交並推送至 Github, 建立個人 Github 帳號對應的Personal Token, 就可以放入近端倉儲 .git/config 中的 origin url 帳號密碼區, 然後將改版資料推送到 Github. \n 利用 Personal Token 字串 push 改版資料的步驟: \n \n 至 Github 帳號 settings 下的開發者區域建立能夠更動 repo 的權限, 並且決定此 Token 權限的使用期限. \n 將此 Token 字串放入對應倉儲 .git/config 檔案中的 origin url=https://Token_String@github.com/帳號/cp2021_hw.git \n \n', 'tags': '', 'url': 'Token.html'}, {'title': 'SSH push', 'text': 'Github 帳號用戶除了可以利用 Personal Token push 改版資料外, 也可以利用 SSH keys 將改版資料 push 到 Github. 詳細說明可以參考  SSH 了沒 . \n 以下說明 SSH push 操作步驟: \n \n 下載 putty 安裝套件, 安裝後, 將 putty 目錄取出放入隨身碟 y:\\ 目錄中 (也就是 data 目錄中). \n 修改 start_ipv4.bat 或 start_ipv6.bat, 設定 GIT_SSH 變數, 指向 putty 套件目錄中的 plink.exe, 表示隨後的 git push 將透過 putty 中的 session 設定連網. 亦即在 start_ipv4.bat 或 start_ipv6.bat 檔案中加入  set GIT_SSH=%Disk%:\\putty\\plink.exe \n 利用 putty 中的 puttygen.exe 建立 keys, 按下 generate 後, 在 puttygen 執行視窗上方以滑鼠隨意移動, 以便利用滑位置隨機建立 keys, 完成後在原先滑鼠移動位置所出現的 key, 即為 OpenSSH 格式的 public key 內容, 而此一內容就是要放到 Github 帳號 settings 中的 SSH and GPG keys 中的 new SSH key 欄位區 (此為用戶所設定的 public key). \n 接下來要利用 puttygen 建立 keys 視窗右下的 save private key, 將此一 .ppk private key 存到 home_ipv4 或 \n home_ipv6 目錄下. \n 接下來要啟動 putty.exe 建立一個能夠連線至 github.com 網站的 session, 此 session 可以取名為 github.com, 也可以取其它名稱, 只是這個 session 名稱, 將會成為 git 指令與 plink.exe 連結使用後的連線 session 名稱. 而在設定此連線到 github.com 的 session, 在無需設定 proxy 的情況下, 只需要指定 SSH - AUTH 中的 private key 存放位置. \n 最後則是配合採用 SSH 協定連線, 必須要修改倉儲中 .git/config url 的連線協定, 從原先的  https://github.com/帳號/cp2021_hw.git  改為  git@github.com:帳號/cp2021_hw.git  也就是採用 git 作為連線到 putty session 名稱 github.com, 然後採用 github 帳號檢查是否此 private key 與前述放入 Github SSH and GPG keys 的 public 成對, 若匹配成功, 則使用者利用上述的 SSH 就可以執行將改版內容 push 到 Github. \n \n 上述採 SSH 流程 push 改版資料的基本概念為: \n \n 啟動隨身系統時就告知 GIT_SSH 變數, 要利用 putty 工具作為 SSH 連線的 client 端. \n 接著要建立 OpenSSH 格式的 public key, 在 Github 帳號下完成登記. \n 至於近端則要儲存與送到 Github public 對應的 putty 格式 private key, 因為設定 putty session 時會用到此 private key. \n 接著就是利用這把近端的 private key, 建立一個能夠採 SSH 協定連線到 Github 的 putty session, 此 session 其實只有三個基本屬性: 連線主機符號名稱, 也就是 github.com, 連線 session 名稱, 以及與 session 對應的 private key 位置. \n 最後就是修改要採 SSH push 的倉儲中 .git/config url 連線協定, 從 https 改為 SSH, 並以 git 作為登入帳號, 且宣告所要使用的 putty session 名稱與登入後要驗證 key 權限的 session 名稱. \n \n', 'tags': '', 'url': 'SSH push.html'}, {'title': '中英打', 'text': 'Gist是Github的一個子服務，且任何人都可以使用這個服務，不論你是否擁\n有Github帳號。以開發者的角度來說，最基本的功能就是可ˇ以分享片段的原\n始碼。有別於Github的Repository，Gist可以只分享專案中的某一個小檔案\n中的程式碼，且擁有私人的選項，讓別人不會搜尋到你的Gist。在Github的\nRepository設定Private是要付費的，但在Gist是不需要的。除次之外Gist\n還有許多用處，包括可以直接執行我們就來一一介紹吧!\n\n7min 50sec \n Every gist is a Git repository,whitch means that it can be forkwd and cloned.If yoy are signed in to\nGitHub when you creat a gist,the gist will br associated with your account and you will see it in your\nlist of gists when you navigate to your gist home page.\n\nGist can be public or sercet.Public gists show up in Discover,where people can browse new gists as\nthey\'re created.They\'re also searchable,so you can use them if you\'d like other people to find and \nsee your work.\n\nSecret gists don\'t show up in Discover and are not searchable.Secret gists aren\'t private.if you send\nthe UPL of secret gist gist to a friend,they\'ll be able to see it.However,if someone you don\'t know\ndiscovers the URL,they\'ll also be able to see your gist.If youneed to keep your code away from\nprying eyes,you may want  tp creat a private respository instead.\n\nAfter creating a gist,you cannot convert it from public to srcret.\n\nYou\'ll receive a notification when:\n\nYou are the author of a gist.\nSomeone mentions you in a gist.\nYou subscribe to a gist,by clocking Subscribe at the top of any gist.\n\nYou an discover public gists others have created by going to the gist home page and clicking All\nGists.This will take you to a page of all gists sorted and displated by time of creation or update.You\ncan also searrch gists by language with Gist Search.Gist search uses the same search syntax as code\nsearch.\n\nSince gists are Git repositories,you an view thrir full commit history,complete with diffs.You can\nalso fork or clone gist.For more information,see"Forking and cloning gists".\n\nYou can dowmload a ZIP file of a gist by clicking the Download ZIP button at the top of the gist.You\ncan embed a gist in any text field that supports javascript,such as a blog post.Toget the embed\ncode,click the clipboard icon next to the Embed URL of a gist.To embed a specific gist file ,append\nthe Embed URL with ?file=FILENAME.\n\nGist supports mapping GeoJSON files.These maps are displayed in embedded gists,so you can easily\nshare and embed maps.For more information,see"Working with non-code files"\n\n41min 20sec \n \n  ######################  editor1 結束 ######################  \n  以下可以開始利用 editor1 的設定編寫對應 Brython 程式  \n \n  以上為內建程式, 頁面可透過 ?src=gist_url 執行  \n  add 1 to 100 開始  \n \n \n', 'tags': '', 'url': '中英打.html'}, {'title': 'HW2', 'text': '在電腦輔助設計的新電腦上可以利用 USB 隨身碟設定所謂 Hybrid 可攜程式系統, 也就是 Python 與 Portablegit 使用 c:\\2021_portable_kmol\\data 目錄中的檔案, 而將 start_ipv4.bat, start_ipv6.bat, data, wscite, tmp 等目錄放在 USB 隨身碟. \n 在電腦輔助設計室中, 以 USB 隨身碟啟動的 start_ipv4.bat 檔案內容:  start_ipv4_hybrid.txt \n 在動態系統中加入 run 頁面的 html 原始碼:  run.txt \n 當你建立 Github 帳號後就可以利用 Gist 儲存資料或程式碼, 且可以利用  https://mde.tw/cp2021/content/run.html  來執行 Brython 程式. \n 在  run.html  執行 Brython 程式, 可以使用下列三種方法: \n \n 直接連線至  https://mde.tw/cp2021/content/run.html  將 Brython 程式寫在編輯區, 然後按下 Run. \n 將 Brython 程式存在 Gist, 利用 run.html?src=Gist_URL,  run.html  中的 Javascript 就會導入此 Gist 程式執行. \n 將 Brython 程式寫在  run.html  頁面 html 超文件中, 然後安排其中的 Javascript 或 Brython 程式導入執行. \n \n 建立可攜程式系統時必須了解 start_ipv4.bat 或 start_ipv6.bat 中的所有指令用法: \n 以電腦輔助設計室中使用新電腦的 USB 可攜 Hybrid 設定 start_ipv4.bat 為例. \n @echo off\nset Disk=y\nsubst %Disk%: "data"\n\nset Local=C:\\2021_cadlab_portable\\data\n\n%Disk%:\n\nset HomePath=%Disk%:\\home_ipv4\nset HomeDrive=%Disk%:\\home_ipv4\nset Home=%Disk%:\\home_ipv4\nset USERPROFILE=%Disk%:\\home_ipv4\n\nREM 將系統 Python 程式的 io 設為 utf-8\nset PYTHONIOENCODING="utf-8"\n\nset PYTHONPATH=%Local%\\Python395\\DLLs;%Local%\\Python395\\Lib;%Local%\\Python395\\Lib\\site-packages;\n\nset PYTHONHOME=%Local%\\Python395\n\nREM 使用 putty 設定 git ssh 連線\nset GIT_SSH=%Disk%:\\putty\\plink.exe\n\nREM 設定跟 Python 有關的命令搜尋路徑\nset path_python=%Local%\\Python395;%Local%\\Python395\\Scripts;\nset path_portablegit=%Local%\\portablegit_2.31.1\\bin;\n\npath=%Disk%:;%path_python%;%path_portablegit%;%path%;\n\nREM ref: https://drive.google.com/file/d/1S0XYN-1MKxo0KFYxs0pFTcTrr8NL4n1b/view\n\nREM REGEDIT.EXE /S %Disk%:\\putty_github_com.reg;\n\nstart /MIN cmd.exe\nstart /MIN cmd.exe\nstart /MIN cmd.exe\nstart /MIN cmd.exe\n\nstart /MIN %Disk%:\\wScite\\SciTE.exe\nstart /MIN %Disk%:\\wScite\\SciTE.exe\n\nExit \n 因為電腦 C:\\ 中存放的可攜系統位於 C:\\2021_cadlab_portable\\data, 因此將此路徑設為 Local 變數, 然後與 Python 即 Portablegit 有關的路徑都使用 %Local% 變數設定. \n 有關 SSH push 設定必須將 putty 系統登錄檔案匯出後, 在啟動隨身系統時載入所需設定.  putty 設定登錄檔案匯出與匯入說明影片 . \n Windows 指令: \n echo off , 而放在前面的  @ 指令說明 . \n set : 設定 環境變數 . \n HomePath, HomeDrive, Home, USERPROFILE 都屬於 Windows 操作系統的 環境變數 . \n HW1-1 : 將左右碰撞移動的紅色方塊, 改為先移動到水平畫面中心點位置後, 接著上下碰撞移動. \n HW1-2 : 加入與  Cango 頁面  Fourbar 程式碼相同功能的啟動按鈕, 讓使用者可以利用按鈕啟動或中斷紅色方塊上下碰撞移動. 完成後請將程式碼存入個人 Gist 區. \n \n HW2 - 可攜程式系統與個人網站佔學期成績 20%. \n HW2 具體項目成果回報區 \n 可攜程式系統與 Python 範例程式收集整理 \n 1. 請準備一個至少 64 GB 大小的 USB 3.0 以上隨身碟 (或外接 SSD), 根據  Task2  中的說明, 建立自己的可攜程式系統. \n 2. 請登入 Github 帳號後, 連線至  https://github.com/mdecourse/cp2021_hw  後, 透過  Use this template  按鈕建立自己的 cp2021_hw 倉儲. 並至該倉儲的 Settings -> Pages -> Source 將 main 分支設為 Github Pages 的 root (也就是選擇將倉儲的 main 分支設為對應網站的根目錄). \n 3. 請將 HW1 與 HW2 的作業內容登錄至個人的 cp2021_hw 倉儲與網站中. (學習如何透過 git 指令修改倉儲中的版本內容) \n 4. 請在個人作業網站的 HW2 區域下增設一個 H2 頁面, 將該網頁標題命名為 run, 可以如  run  頁面中的內容, 並且利用此頁面收集 Python 範例程式. (例如: 可自動執行的貪食蛇:  https://mde.tw/cp2021/content/run.html?src=https://gist.githubusercontent.com/mdecourse/d306a1f57e53bfd6466eaae20bcb9439/raw/2160a12b9fec9707a120a383ed5d38b9b78a02cf/snake.py  將  https://gist.github.com/mdecourse/d306a1f57e53bfd6466eaae20bcb9439  作為  https://mde.tw/cp2021/content/run.html  頁面中 src 變數的值, 就可以在頁面中導入程式碼並執行) \n', 'tags': '', 'url': 'HW2.html'}, {'title': 'W11-1', 'text': 'Examples \n w11_notes.txt \n w11_1b_p261.txt \n 以下為  https://mde.tw/cp2021_hw/content/W11.html  按鈕範例. \n 1."<p><button id="名稱">名稱</button>"為設置按鈕 \n 2.導入 brython 程式庫 \n 3."名稱_url= gist raw" \n 4.將 Ace3 編輯器對應的 button 寫為 class class button:  def __init__(self, url):  self.url = url \n 1 add to 100 p261 \n 將 iterable 與 iterator  相關說明 , 利用 Brython 與 Ace Editor 整理在這個頁面. \n  導入 brython 程式庫  \n \n \n  啟動 Brython  \n \n  導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["py_src"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  內建程式 1 ####################################### 內建程式 1 開始 \n \n \n \n  內建程式 1 ####################################### 內建程式 1 結束 \n \n  button 程式 1 ####################################### button 程式 1 開始 \n  add 1 to 100 開始  \n \n \n  add 1 to 100 結束 \n  editor1 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div 作為切入位置  \n \n  editor1 結束  \n \n  button 程式 1 ####################################### button 程式 1 結束 \n \n  button 程式 2 ####################################### button 程式 2 開始 \n 第二編輯區程式 ( 編輯  Snake 原始碼): \n 查驗輸入字串 Snake Snake2 \n  判斷輸入字串是否aA1$, 且至少 8 個字元-開始  \n \n \n  判斷輸入字串是否aA1$, 且至少 8 個字元-結束 \n  editor2 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div 作為切入位置  \n \n  editor2 結束  \n \n  button 程式 2 ####################################### button 程式 2  結束 \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n \n References: \n https://zerojudge.tw/ \n https://shaform.com/csdream/docs/problem-solving/ \n https://onlinejudge.org/ \n', 'tags': '', 'url': 'W11-1.html'}, {'title': 'W12-1', 'text': '\n w12demo.txt \n ROC 國旗規格 . \n PROC 國旗規格  - 可以根據此規格定義, 新增  PROC flag  按鈕. \n USA 國旗規格  - 可以根據此規格定義, 新增  USA flag  按鈕. \n  導入 brython 程式庫  \n \n \n  啟動 Brython  \n \n  導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["py_src"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n \n add 1 to 100 p261 ROC flag \n  ######################  editor1 開始 ######################  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div 作為切入位置  \n  這裡的畫布 id 為 brython_div  \n \n  ######################  editor1 結束 ######################  \n  以下可以開始利用 editor1 的設定編寫對應 Brython 程式  \n \n  以上為內建程式, 頁面可透過 ?src=gist_url 執行  \n  add 1 to 100 開始  \n \n \n', 'tags': '', 'url': 'W12-1.html'}, {'title': 'run1', 'text': '第一種在網頁執行 Brython 程式的方法, 是使用者在網際程式編輯區輸入 Brython 程式碼, 必須手動按下 Run 才能執行. \n  導入 brython 程式庫  \n \n \n  啟動 Brython  \n \n  導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["py_src"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  印出版次與關鍵字程式  \n \n \n \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  Filename:  .py    存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div 作為切入位置  \n \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n', 'tags': '', 'url': 'run1.html'}, {'title': 'run2', 'text': '第二種執行 Brython 程式的方法, 是將 Brython 程式存在 Gist, 利用 run.html?src=Gist_URL,  run.html  中的 Javascript 就會導入此 Gist 程式並自動執行. \n 按下導入 cango_gear1.py 且自動執行 \n 上述連結為: \n https://mde.tw/cp2021_hw/content/run.html?src=https://gist.githubusercontent.com/mdecourse/e896a4705a95ac8cc4147b355b0e87ef/raw/8954b8280c524c5781dc3c0b3565bc489d3aa3a3/cango_gear1.py \n run.html 後的變數為 ?src= https://gist.githubusercontent.com/mdecourse/e896a4705a95ac8cc4147b355b0e87ef/raw/8954b8280c524c5781dc3c0b3565bc489d3aa3a3/cango_gear1.py \n 其中的  e896a4705a95ac8cc4147b355b0e87ef  為 gist 檔案群組編號, 而隨後的  8954b8280c524c5781dc3c0b3565bc489d3aa3a3  則為 cango_gear1.py 的版次編號. \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n', 'tags': '', 'url': 'run2.html'}, {'title': 'run3', 'text': '\n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n', 'tags': '', 'url': 'run3.html'}, {'title': 'HW3', 'text': '\n HW3 - AI 貪食蛇佔學期成績 30%. \n HW3 必須在 2021.12.22 22:00 之前完成. \n HW3 具體項目成果回報區 將於 2021.11.09 開啟, 於  2021.12.22 22:00 關閉 \n 網際貪食蛇的逆襲, 誰的 自動執行貪食蛇 能夠破紀錄? 目前直覺貪食蛇紀錄為 45 節 (除了蛇身節數外, 應該還要置入出現紅色標的物後的總完食時間). \n 手動執行貪食蛇 程式說明與整理. \n 自動執行貪食蛇 程式說明與整理. \n 自動執行貪食蛇 程式的改進. \n 參考資料: \n https://mde.tw/cp2021/content/Task3.html \n Brython snake 原始來源:  https://medium.com/swlh/sick-of-javascript-just-use-browser-python-4b9679efe08b \n https://github.com/mdecourse/snake-Q-Learning \n https://towardsdatascience.com/teaching-a-computer-how-to-play-snake-with-q-learning-93d0a316ddc0 \n https://github.com/mdecourse/SnakeQlearning \n https://medium.com/@italohdc/learnsnake-teaching-an-ai-to-play-snake-using-reinforcement-learning-q-learning-b63ac23dfdd1 \n https://towardsdatascience.com/snake-played-by-a-deep-reinforcement-learning-agent-53f2c4331d36 \n https://www.geeksforgeeks.org/ai-driven-snake-game-using-deep-q-learning/ \n https://www3.hs-albsig.de/wordpress/point2pointmotion/2020/10/09/deep-reinforcement-learning-with-the-snake-game/ \n 2016_Exploration of Reinforcement Learning to SNAKE.pdf \n train_a_snake_with_reinforceme.pdf \n https://medium.com/@hugo.sjoberg88/using-reinforcement-learning-and-q-learning-to-play-snake-28423dd49e9b \n https://github.com/mdecourse/Snake-Reinforcement-Learning \n Autonomous-Agents-in-Snake-Game-via-Deep-Reinforcement-Learning.pdf \n 延伸應用: \n \n \n \n \n https://github.com/mdecourse/snake-ai-pytorch \n', 'tags': '', 'url': 'HW3.html'}, {'title': 'manual snake', 'text': ' 導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["py_src"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  印出版次與關鍵字程式  \n \n \n \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  Filename:  .py    存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div 作為切入位置  \n', 'tags': '', 'url': 'manual snake.html'}, {'title': 'AI snake', 'text': ' 導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["py_src"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  印出版次與關鍵字程式  \n \n \n \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  Filename:  .py    存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div 作為切入位置  \n \n', 'tags': '', 'url': 'AI snake.html'}, {'title': 'Final Project', 'text': 'Final Project 佔學期成績 30% \n Final Project 必須在 2022.01.05 22:00 之前完成 . \n Final Project 具體項目成果回報區 將於 2021.11.09 開啟, 於  2022.01.05 22:00 關閉 \n 利用 Brython 寫一個會 令人想玩 的網際遊戲. \n 參考章節: \n \n 專題摘要 \n 資料蒐集 \n 設計動機 \n 設計方法 \n 結果與討論 \n 附錄 \n \n 參考資料: \n https://github.com/collections/web-games \n https://github.com/topics/web-game \n https://github.com/topics/browser-game \n https://github.com/leereilly/games \n https://bmsleight.github.io/brython-blocks/ \n https://github.com/mdecourse/brython-blocks \n', 'tags': '', 'url': 'Final Project.html'}, {'title': 'run src', 'text': '<h2>run</h2>\n<!-- 導入 brython 程式庫 -->\n<script src="./../cmsimde/static/brython.js"></script>\n<script src="./../cmsimde/static/brython_stdlib.js"></script>\n<!-- 啟動 Brython -->\n<script>// <![CDATA[\nwindow.onload=function(){\nbrython({debug:1, pythonpath:[\'./../cmsimde/static/\',\'./../downloads/py/\']});\n}\n// ]]></script>\n<p><!-- 導入 FileSaver 與 filereader --></p>\n<p>\n<script type="text/javascript" src="./../cmsimde/static/ace/FileSaver.min.js"></script>\n<script type="text/javascript" src="./../cmsimde/static/ace/filereader.js"></script>\n</p>\n<p><!-- 導入 ace --></p>\n<p>\n<script type="text/javascript" src="./../cmsimde/static/ace/ace.js"></script>\n<script type="text/javascript" src="./../cmsimde/static/ace/ext-language_tools.js"></script>\n<script type="text/javascript" src="./../cmsimde/static/ace/mode-python3.js"></script>\n<script type="text/javascript" src="./../cmsimde/static/ace/snippets/python.js"></script>\n</p>\n<p><!-- 請注意, 這裡使用 Javascript 將 localStorage["py_src"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱--></p>\n<p>\n<script type="text/javascript">// <![CDATA[\nfunction doSave(storage_id, filename){\n    var blob = new Blob([localStorage[storage_id]], {type: "text/plain;charset=utf-8"});\n    filename = document.getElementById(filename).value\n    saveAs(blob, filename+".py");\n}\n// ]]></script>\n</p>\n<p><!-- 印出版次與關鍵字程式 --></p>\n<p>\n<script type="text/python3">// <![CDATA[\nfrom browser import document as doc\nimport ace\n# 清除畫布\ndef clear_bd(ev):\n    bd = doc["brython_div"]\n    bd.clear()\n# Brython 3.3.4 內建的 container 名稱為  \'container\' 且 turtle 輸出為 svg 必須使用 div 訂定 id\nAce = ace.Editor(editor_id="kw_editor", console_id="kw_console", container_id="kw__container", storage_id="kw_py_src" )\n# 從 gist 取出程式碼後, 放入 editor 作為 default 程式\ndef run():\n    # 利用 get 取下 src 變數值\n    try:\n        url = doc.query["src"]\n    except:\n        url = "https://gist.githubusercontent.com/mdecourse/e896a4705a95ac8cc4147b355b0e87ef/raw/8954b8280c524c5781dc3c0b3565bc489d3aa3a3/cango_gear1.py"\n    prog = open(url).read()\n\n    # 將程式載入編輯區\n    Ace.editor.setValue(prog)\n    Ace.editor.scrollToRow(0)\n    Ace.editor.gotoLine(0)\n    # 直接執行程式\n    #ns = {\'__name__\':\'__main__\'}\n    #exec(prog, ns)\n    # 按下 run 按鈕\n    Ace.run()\n\n# 執行程式, 顯示輸出結果與清除輸出結果及對應按鈕綁定\ndoc[\'kw_run\'].bind(\'click\', Ace.run)\ndoc[\'kw_show_console\'].bind(\'click\', Ace.show_console)\ndoc[\'kw_clear_console\'].bind(\'click\', Ace.clear_console)\ndoc[\'clear_bd\'].bind(\'click\', clear_bd)\n# 呼叫函式執行\nrun()\n// ]]></script>\n</p>\n<p><!-- 用來顯示程式碼的 editor 區域 --></p>\n<div id="kw_editor" style="width: 600px; height: 300px;"></div>\n<p><!-- 以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合 --></p>\n<!-- 存擋表單開始 --><form><label>Filename: <input id="kw_filename" placeholder="input file name" type="text">.py</label> <input onclick="doSave(\'kw_py_src\', \'kw_filename\');" type="submit" value="Save"></form><!-- 存擋表單結束 -->\n<p></p>\n<!-- 執行與清除按鈕開始 -->\n<p><button id="kw_run">Run</button> <button id="kw_show_console">Output</button> <button id="kw_clear_console">清除輸出區</button><button id="clear_bd">清除繪圖區</button><button onclick="window.location.reload()">Reload</button></p>\n<!-- 執行與清除按鈕結束 -->\n<p></p>\n<!-- 程式執行 ouput 區 -->\n<div style="width: 100%; height: 100%;"><textarea autocomplete="off" id="kw_console"></textarea></div>\n<!-- Brython 程式執行的結果, 都以 brython_div 作為切入位置 -->\n<div id="brython_div"></div>\n<!-- 導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫 -->\n<script src="https://mde.tw/cp2021/cmsimde/static/Cango-24v03-min.js"></script>\n<script src="https://mde.tw/cp2021/cmsimde/static/gearUtils-09.js"></script>\n<script src="https://mde.tw/cp2021/cmsimde/static/SVGpathUtils-6v03-min.js"></script>\n<script src="https://mde.tw/cp2021/cmsimde/static/sylvester.js"></script>\n<script src="https://mde.tw/cp2021/cmsimde/static/PrairieDraw.js"></script> \n  Brython 程式執行的結果, 都以 brython_div 作為切入位置  \n', 'tags': '', 'url': 'run src.html'}, {'title': 'Final exam', 'text': '', 'tags': '', 'url': 'Final exam.html'}, {'title': '41023140', 'text': ' 導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["py_src"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  印出版次與關鍵字程式  \n \n \n \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  Filename:  .py    存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div 作為切入位置  \n \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n', 'tags': '', 'url': '41023140.html'}, {'title': 'EXAM', 'text': ' 導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["py_src"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n \n exam \n  ######################  editor1 開始 ######################  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div 作為切入位置  \n  這裡的畫布 id 為 brython_div  \n \n  ######################  editor1 結束 ######################  \n  以下可以開始利用 editor1 的設定編寫對應 Brython 程式  \n \n  以上為內建程式, 頁面可透過 ?src=gist_url 執行  \n  add 1 to 100 開始  \n \n \n', 'tags': '', 'url': 'EXAM.html'}]};