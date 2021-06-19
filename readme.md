<!-- omit in toc -->
# 希望の睡眠 - Desires of Sheep

<!-- omit in toc -->
## Contents
- [Abstract/Target](#abstracttarget)
- [Features](#features)
  - [Future Features](#future-features)
  - [Try & Challenges](#try--challenges)
- [Using Tools](#using-tools)
  - [Framework](#framework)
  - [Frontend](#frontend)
  - [Using NPM Libraries](#using-npm-libraries)
  - [Development Tools](#development-tools)

## Abstract/Target

**「絶望の起床』から逃げませんか？」**

>  私の経験に拠る所なのですが、このサポーターズのハッカソン、最初の集合時間が昼の11時であるにも関わらず、自己紹介中に全員が集合したことを私は見たことがありません。それは偏に、『絶望の起床』によるものだと考えられます。
>
> 私もこの言葉はハッカソン中でしか聞いたことがないのですが、どうやらこれは夜遅くまで作業した結果、朝起きられず、朝起きた時には何もかもがすべて終わっていたような状態を指すらしいです。

> **そこで、私は『絶望の起床』を避けるために必要なことについて考えてみました。**

> 今までもこの課題で多くのプロダクトが生まれましたが、それらの多くは「早く起きる」を目標にしたプロダクトばかりでした。それでは睡眠時間を削ることになり、却って次なる絶望の起床を引き起こすことになります。
>
> さらに言えば、皆さんは睡眠不足によってどのような影響があるかをご存じでしょうか。睡眠不足は集中力の低下や記憶力の低下はもちろん、自殺のリスクを高める事も最近の研究で知られています。
>
> このようなことから、『絶望の起床』を避けるために朝早く起きる試みは失敗するどころか悪化や別の問題を引き起こすことにつながります。

> **そこで、私は逆に、「早く寝る」を目標にしたプロダクトを作ることにしました。**

　このプロダクトは「早く寝る」ことを強制させるためのツールです。 ***大事なことは強制させるためのツールであることです。*** ただ、目標にするだけでは忙しい現代人は何かと理由をつけて夜遅くまで起きるのでその取り組みは持続しません。あらゆる手段でもって睡眠時間を矯正し、長時間の十分な睡眠を確保、心地の良い朝を毎日迎えられることをこのツールの目的とします。

　今回のハッカソン版では、ターゲットとするのは開発者やエンジニア、さらにはPCを使って作業するような創作者などの時間を忘れて没頭したり、休むことを知らないような人たちに限定します。スマホアプリで管理したところでエンジニアはPC使いであるからあまり意味はない仮定の下、デスクトップアプリを作りました。


## Features

![Win](icons/windows.svg)]![Mac](icons/apple.svg)![Linux](icons/linux.svg)

- PCをシャットダウンすることで作業できないような状態を生み出します。
  - 設定で指定した睡眠開始時間にPCをシャットダウンします。
  - 設定で指定した時間内にPCを起動した場合、自動的にアプリが起動することでPCをシャットダウンします。
  - **PCのシステム時間変更に対抗するため、最低一時間に一回とシステム時間変更検知時にNTPサーバー(time.google.com)と現在地情報から取得したタイムゾーンを使用して同期を行います。**
- 指定した睡眠開始時間の一時間前から設定された音楽を流し、心地の良い睡眠を促します。
  - YoutubeのURLを設定することで音楽を取得し、再生します。
    - （余談だが、今回使用したElectronには音を再生するための専用ツールはないため、HTML5を用いた疑似的なライブラリを作成した）
- あらゆるエンジニアに対応するため、Windows/Mac/Linuxの主要な三大OSに対応。


### Future Features
> 以下の機能は想定に反して困難であった、または今回実装する必要がないと判断した機能のうち、希望があれば後続開発で実装する機能の一覧です。

- タスクキルに対抗するため、複数のアプリケーションを使用してタスクキルを監視し、タスクキルによって消されたタスクをもう一方のタスクが復元する機能。
- シャットダウンをスリープに変更する機能。
- Youtubeのプレイリストを読み込んで自身のプレイリストに格納する機能。
- 自動更新機能。

### Try & Challenges
- 何気に初めて `Javascript` メインでの開発を行った
  - 普段書かないスクリプト言語の言語思想の理解に時間がかかった
  - 今度「『C*』erからみたスクリプト言語の難解な部分」みたいな記事を書いてもいいかもしれない
- 技術選定に苦労した
  - 選定候補に `C#(.NET)` と `Python(wxPython他ライブラリ群)` が挙がっていたがそれぞれ「クロスプラットフォームでの制作難易度」、「モダンUIの制作難易度」の点から除外された
- NodeJSの `Promise` に苦労させられた
  - かなりあちこちにバグが点在している匂いがするので正直書き直したい
- `electron` にはバックグラウンドで音声を再生する為の関数がないため、 `HTML5` を利用して疑似的なライブラリを制作した
  - かなり使用に条件があるので微妙な点も多いがちゃんと清書して公開したい
- 開発速度を上げるためにホットリロードを採用
  - `electron` と `node-sass` のホットリロードを同時に起動するような仕組みを作成した

## Using Tools
![Electron Logo](icons/electron.svg)![npm Logo](icons/Npm.svg)![vscode Logo](icons/vscode.svg)


### Framework
- [electron](https://github.com/electron/electron)（npmを使用してインポート）
  - `HTML5` と `JavaScript` を使用してデスクトップアプリケーションを開発するフレームワーク。

### Frontend
- HTML5
- CSS/SASS( `*.scss` を `node-sass` を使用して `*.css` に変換した)
- javascript
- awesomefont

### Using NPM Libraries
- electron系ライブラリ
  - [electron-store](https://www.npmjs.com/package/electron-store)
- electron系開発用ライブラリ
  - [electron-log](https://www.npmjs.com/package/electron-log)
  - [electron-reload](https://www.npmjs.com/package/electron-reload)
  - [electron-builder](https://www.npmjs.com/package/electron-builder)
- フロントエンド開発用ライブラリ
  - [node-sass](https://www.npmjs.com/package/node-sass)
- フロントエンド用ライブラリ
  - [@fortawesome/fontawesome-free](https://www.npmjs.com/package/@fortawesome/fontawesome-free)
- NodeJS系ライブラリ
  - [moment](https://www.npmjs.com/package/moment)
  - [@mapbox/timespace](https://www.npmjs.com/package/@mapbox/timespace)
  - [timespan](https://www.npmjs.com/package/timespan)
  - [node-cron](https://www.npmjs.com/package/node-cron)
  - [ytdl-core](https://www.npmjs.com/package/ytdl-core)

### Development Tools
- [npm](https://www.npmjs.com/)
  - `electron` をはじめとするパッケージを管理
- [vscode](https://code.visualstudio.com/)
- [github](https://github.com)
  - 個人開発でも複数デバイスでの連携や、実験的なアプローチを行うためのブランチ分けなど、必要な場面はかなりあった


