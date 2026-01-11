---
title: "FORESTY101 CTF Writeup"
description: "Full writeup of the FORESTY101 CTF competition by Team KubaPalak. Covering Web, Crypto, Forensics, and Binary Exploitation challenges."
pubDate: "Jan 28 2020"
tags:
  [
    "ctf",
    "writeup",
    "foresty",
    "telkom-university",
    "web",
    "crypto",
    "forensics",
  ]
heroImage: "/images/KubaPalakCTFWriteup/image1.png"
---

# [FORESTY101 CTF] - Writeup

**Team:** KubaPalak  
**Event:** Foresty101 CTF (Telkom University Cybersecurity Lab)

> [!NOTE]
> **Name Origin:** The name **KubaPalak** is an anagram of _BukaLapak_, a prominent Indonesian e-commerce platform that was highly influential during our time at university.

---

## WEB EXPLOITATION

### Ngoding Web Skuy - 50 Poin

**Challenge:** This challenge consists of a website containing a hidden flag.

<img src="/images/KubaPalakCTFWriteup/image14.png" alt="Ngoding Web Skuy Challenge" />

Getting this flag was quite easy. Just by using _inspect element_, we found something suspicious at `http://13.76.181.86:9200/style/style.css`:

```css
.bendera {
  background-color: Rm9yZXN0eTEwMX;
  border: 1px solid #1e88e5;
  color: red;
}
```

The `background-color` value was unusual. We suspected it was **Base64**, so we decoded it using an online decoder.
Result: `Foresty101`

Not satisfied with that result, we looked for more "weird" things in the web. We found something suspicious in `http://13.76.181.86:9200/style/script.js`:

```javascript
$(document).on("click", "a.scroll-to-top", function (e) {
  var $anchor = $(this);
  $("html, body")
    .stop()
    .animate(
      {
        scrollTop: $($anchor.attr("href")).offset().top,
        gendero_londo: "X3RpZGFrX2FkYV95Z19hbWFu",
      },
      1000,
      "easeInOutExpo",
    );
  e.preventDefault();
});
```

When decoded with Base64, it produced: `_tidak_ada_yg_aman`.

Finally, we combined them to form the flag. <br>
**Flag**: **`Foresty2019{Foresty101_tidak_ada_yg_aman}`**.

---

### Cookies choco chips ^\_^ - 50 Poin

**Challenge:** Given the web address `http://13.76.181.86:9400/`.

<img src="/images/KubaPalakCTFWriteup/image15.png" alt="Cookies Challenge" />

We look up the page and it shows this

<img src="/images/KubaPalakCTFWriteup/image20.png" alt="Web Interface" />

The page shows a picture of cookies. Answering what Ganjar asked ("Hi, Apa kabar mu sekarang ??"), we are fine ^\_^.
Based on the title, we targeted the **cookies** on the website.

Checking the cookies revealed the flag

**Flag**: **`Foresty2019{c00kiEs_1s_Imp0rt@n7}`**

---

### Request Me !! - 80 Poin

**Challenge:** Given the web address `http://13.76.181.86:9300/`.

<img src="/images/KubaPalakCTFWriteup/image9.png" alt="Request Me Challenge" />

At the first glance, the webpage looks like this:

<img src="/images/KubaPalakCTFWriteup/image2.png" alt="Web Page Request Me Challenge" />

We tried _inspect element_ on the web and found an unusual comment:

```php
<!--
$input = $_POST['inputan'];
$len = strlen($input);
# comparation char per char
if($input[$len] == "?"){
    if($input[$len-1] == "?"){
        if($input[$len-2] == "G"){
            if($input[$len-3] == "4"){
                if($input[$len-4] == "l"){
                    if($input[$len-5] == "f"){
                        if($input[$len-6] == "_"){
                            if($input[$len-7] == "H"){
                                if($input[$len-8] == "a"){
                                    if($input[$len-9] == "l"){
                                        if($input[$len-10] == "4"){
                                    if($input[$len-11] == "d"){
                                if($input[$len-12] == "@"){
                            if($input[$len-13] == "_"){
                        if($input[$len-14] == "I"){
                    if($input[$len-15] == "n"){
                if($input[$len-16] == "1"){
                    echo "flag";
}}}}}}}}}}}}}}}}} -->
```

Seeing that, we thought to read it backwards, becoming: `1nI_@d4laH_fl4G??`.

We doubted this was the flag because the format didn't match. So we decided to input that result into the available input field.

After submitting, the web displayed the real flag.
**Flag**: **`Foresty2019{0v33R_th1nkIng_m@y_k1lL_U}`**

---

## MISC

### this-is-not-pcap-file - 50 Poin

Given a file. Since the title says it's **not** a pcap file, we opened it using `strings`.
Because the title suggests it, we used `strings` and then `grep 2019` because there was too much output.

```bash
$ strings SkypeIRC.cap | grep 2019
Foresty2019{file_in_wireshark_easy1}
```

**Flag**: **`Foresty2019{file_in_wireshark_easy1}`**

---

## BINARY EXPLOITATION

### Tukang Ngegas - 98 Poin

Given `nc 13.76.181.86 8100`. When we entered, it turned out the shell forced commands to become **UPPERCASE**.

Initially, we tried `$(command,,)` because in Bash, that substitution converts to lowercase. However, the shell used was `sh`, not `bash`, so that failed.

Since it forced uppercase, we tried accessing variables that are naturally uppercase like `$USER` and `$HOME`, but the user was `nobody`, leading nowhere.

Finally, we used `$0` to execute the shell itself again. This allowed us to execute commands with lowercase.

```bash
$ nc 13.76.181.86:8100
[!] Connecting to server..
[*] Switching to interactive mode
$ $USER
sh: 1: nobody: not found
$ $HOME
sh: 1: /nonexistent: not found
$ $0
$ cat flag.txt
Foresty2019{5a399860ecef529b27d390a1241dc688}
```

**Flag**: `Foresty2019{5a399860ecef529b27d390a1241dc688}`

---

## CRYPTOGRAPHY

### John & Rock - 70 Poin

<img src="/images/KubaPalakCTFWriteup/image10.png" alt="John The Ripper Challenge" />

Given a ZIP file with a password. Using `strings`, `binwalk`, `hd`, etc., we found no anomalies, concluding we had to **crack the password**.
The description gave little info, but we noticed keywords: "rock", "john", and "china".

We thought of "The Rock" or "John Cena", but in this context, it referred to tools: **RockYou.txt** and **John The Ripper**.
`RockYou.txt` failed, so we used John The Ripper's wordlist.

It quickly found the password: **`chinese`** as we can see in this output.

<img src="/images/KubaPalakCTFWriteup/image3.png" alt="John The Ripper Output" />

However, the file inside was also encrypted as we can see in the image below.
<img src="/images/KubaPalakCTFWriteup/image13.jpg" alt="Chinese Code" />

We used a **Chinese Code Decoder** (dcode.fr/chinese-code).
After inserting the number 3 (as hinted/deduced), we got the result.

<img src="/images/KubaPalakCTFWriteup/image16.png" alt="Chinese Code Decoder" />

**Flag**: **`Foresty2019{JHONYL3BAYY}`**

---

### Tiga-step-aja - 100 poin

Given 3 encrypted texts:

```text
YjMyIC0+IDN4IA==
```

```text
JJFEYRKLKZFUQS2OIZKTMU2TLJFUMRCUIVLVGTKLJZEFMTKXJNEESTK2I
RDVCU2PJRDESVKPKZNFMSSSJBKTEVCTKZFU4QKUJNKEGUCKGVFEIRKWGJ
MEURSDIU2FIS2XJM2UYVKLJZFU2SKKJBLEGVKLJBDUUTKVLFKEGTSJLJG
UKT2RLJKEWSSBKU2FMU2UJM2DERCFKZBUGSSWJJDEWVJSIJDU4Q2FJVKE
WS2LKZGFMQ2TJNCUUNKIIVGVMU2YI5FE2VKZKZFUOTCFGZKDEUCKGVEFK
NSRHU6T2PI=
```

```text
Emuqzcxm kbh xmv? jmur, uvk nynsvai :
Sbdmubl2019{Z1oqp_NbE_Xghm}
```

**Step 1:** Decode the first text (Base64) -> `b32 -> 3x`. <br>
**Step 2:** Decode the second text with **Base32** (3 times). Result: _"MICINN merupakan kunci untuk membuat makanan menjadi lebih nikmat."_ <br>
**Step 3:** "MICINN" seems to be the key. The third text looks like a Vigenère Cipher.

Decoded with Vigenère Cipher (Key: `MICINN`): _"Sesimple itu kan? hehe, ini flagnya :_<br>
**Flag**: **`Foresty2019{M1cin_FoR_Lyfe}`**"

---

### Selamat-datang-crypto

Given encrypted text: ``u@C6DEJa_`hLrCJ!E_:$7F?N``<br>
Hint: reddit.com/r/MRcryptography/comments/642mav/ciphers/

Following the link, we found "Navajo Code".
Using <https://cryptii.com/navajo/text>:

1. Open link.
2. Change Interpret As to **ROT13**.
3. Change variant to **ROT47**.

<img src="/images/KubaPalakCTFWriteup/image19.png" alt="Cryptii ROT47" />

**Flag**: **`Foresty2019{CryPt0iSfun}`**

---

## FORENSICS

### Mamang Post - 50 Poin

<img src="/images/KubaPalakCTFWriteup/image1.png" alt="Mamang Post Challenge" />

Given a PCAP file. We opened it with **Wireshark**.
Clue mentions "post". We searched for suspicious `POST` requests.

We found a POST to `http://192.168.56.110/login.php`.<br>
Parameters: <br>
`secret=Rm9yZXN0eTIwMTl7aHQ3cF9wMCR0X1IzcXVlc1RfaXNfbTNtM30=` <br>
`username=ucok` <br>
`password=password`

<img src="/images/KubaPalakCTFWriteup/image5.png" alt="Wireshark pcap parameter" />

The `secret` parameter looked like Base64. Decoding it gave the flag. <br>
**Flag**: **`Foresty2019{ht7p_p0$t_R3quesT_is_m3m3}`**

---

### Sisipin 13x - 70 Poin

<img src="/images/KubaPalakCTFWriteup/image17.png" alt="Sisipin Challenge" />

We were given a ZIP file containing an image of a sad cat.

<img src="/images/KubaPalakCTFWriteup/image6.jpg" alt="Sad Cat Image" />

We used `binwalk` on the image to see if anything was hidden.
It contained a RAR file inside. Extracting it revealed `flag.txt`.

<img src="/images/KubaPalakCTFWriteup/image12.png" alt="Binwalk Result" />

Content: `Sberfgl2019{5hZorE_vaSbez4gvx4_4q414u_AthYvx_Fraq1e1}`.
The title "Sisipin 13x" hints at **ROT13**.

Decoding with ROT13: <br>
**Flag**: **`Foresty2019{5uMbeR_inForm4tik4_4d414h_NguLik_Send1r1}`**
