// ========== জাভাস্ক্রিপ্ট ==========
    (function() {
        // বাংলা সংখ্যায় রূপান্তর ফাংশন
        function toBanglaNumber(num) {
            const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
            return num.toString().split('').map(digit => banglaDigits[parseInt(digit)]).join('');
        }

        // 24 ঘন্টা থেকে 12 ঘন্টা ফরম্যাটে রূপান্তর (AM/PM সহ)
        function to12HourFormat(timeStr) {
            if (!timeStr) return timeStr;
            const parts = timeStr.split(':');
            if (parts.length !== 2) return timeStr;
            
            let hour = parseInt(parts[0]);
            const minute = parts[1];
            const ampm = hour >= 12 ? 'PM' : 'AM';
            
            hour = hour % 12;
            hour = hour ? hour : 12; // 0 কে 12 এ রূপান্তর
            
            const hourStr = hour.toString().padStart(2, '0');
            return `${toBanglaNumber(hourStr)}:${toBanglaNumber(minute)} ${ampm}`;
        }

        // ঢাকার বেস টাইম (সম্পূর্ণ ৩০ দিন)
        const dhakaTimes = [
            { day: 1, date: '১৯ ফেব্রু', weekday: 'বৃহস্পতি', sehri: "05:12", iftar: "17:58" },
            { day: 2, date: '২০ ফেব্রু', weekday: 'শুক্র', sehri: "05:11", iftar: "17:58" },
            { day: 3, date: '২১ ফেব্রু', weekday: 'শনি', sehri: "05:11", iftar: "17:59" },
            { day: 4, date: '২২ ফেব্রু', weekday: 'রবি', sehri: "05:10", iftar: "17:59" },
            { day: 5, date: '২৩ ফেব্রু', weekday: 'সোম', sehri: "05:09", iftar: "18:00" },
            { day: 6, date: '২৪ ফেব্রু', weekday: 'মঙ্গল', sehri: "05:08", iftar: "18:00" },
            { day: 7, date: '২৫ ফেব্রু', weekday: 'বুধ', sehri: "05:08", iftar: "18:01" },
            { day: 8, date: '২৬ ফেব্রু', weekday: 'বৃহস্পতি', sehri: "05:07", iftar: "18:01" },
            { day: 9, date: '২৭ ফেব্রু', weekday: 'শুক্র', sehri: "05:06", iftar: "18:02" },
            { day: 10, date: '২৮ ফেব্রু', weekday: 'শনি', sehri: "05:05", iftar: "18:02" },
            { day: 11, date: '১ মার্চ', weekday: 'রবি', sehri: "05:05", iftar: "18:03" },
            { day: 12, date: '২ মার্চ', weekday: 'সোম', sehri: "05:04", iftar: "18:03" },
            { day: 13, date: '৩ মার্চ', weekday: 'মঙ্গল', sehri: "05:03", iftar: "18:04" },
            { day: 14, date: '৪ মার্চ', weekday: 'বুধ', sehri: "05:02", iftar: "18:04" },
            { day: 15, date: '৫ মার্চ', weekday: 'বৃহস্পতি', sehri: "05:01", iftar: "18:05" },
            { day: 16, date: '৬ মার্চ', weekday: 'শুক্র', sehri: "05:00", iftar: "18:05" },
            { day: 17, date: '৭ মার্চ', weekday: 'শনি', sehri: "04:59", iftar: "18:06" },
            { day: 18, date: '৮ মার্চ', weekday: 'রবি', sehri: "04:58", iftar: "18:06" },
            { day: 19, date: '৯ মার্চ', weekday: 'সোম', sehri: "04:57", iftar: "18:07" },
            { day: 20, date: '১০ মার্চ', weekday: 'মঙ্গল', sehri: "04:57", iftar: "18:07" },
            { day: 21, date: '১১ মার্চ', weekday: 'বুধ', sehri: "04:56", iftar: "18:07" },
            { day: 22, date: '১২ মার্চ', weekday: 'বৃহস্পতি', sehri: "04:55", iftar: "18:08" },
            { day: 23, date: '১৩ মার্চ', weekday: 'শুক্র', sehri: "04:54", iftar: "18:08" },
            { day: 24, date: '১৪ মার্চ', weekday: 'শনি', sehri: "04:53", iftar: "18:09" },
            { day: 25, date: '১৫ মার্চ', weekday: 'রবি', sehri: "04:52", iftar: "18:09" },
            { day: 26, date: '১৬ মার্চ', weekday: 'সোম', sehri: "04:51", iftar: "18:10" },
            { day: 27, date: '১৭ মার্চ', weekday: 'মঙ্গল', sehri: "04:50", iftar: "18:10" },
            { day: 28, date: '১৮ মার্চ', weekday: 'বুধ', sehri: "04:49", iftar: "18:10" },
            { day: 29, date: '১৯ মার্চ', weekday: 'বৃহস্পতি', sehri: "04:48", iftar: "18:11" },
            { day: 30, date: '২০ মার্চ', weekday: 'শুক্র', sehri: "04:47", iftar: "18:11" }
        ];

        // ৫ ওয়াক্ত নামাজের বেস টাইম (ঢাকার জন্য)
        const dhakaPrayerTimes = [
            { day: 1, fajr: "05:12", dhuhr: "12:10", asr: "15:30", maghrib: "17:58", isha: "19:15" },
            { day: 2, fajr: "05:11", dhuhr: "12:10", asr: "15:30", maghrib: "17:58", isha: "19:15" },
            { day: 3, fajr: "05:11", dhuhr: "12:10", asr: "15:31", maghrib: "17:59", isha: "19:16" },
            { day: 4, fajr: "05:10", dhuhr: "12:10", asr: "15:31", maghrib: "17:59", isha: "19:16" },
            { day: 5, fajr: "05:09", dhuhr: "12:10", asr: "15:32", maghrib: "18:00", isha: "19:17" },
            { day: 6, fajr: "05:08", dhuhr: "12:10", asr: "15:32", maghrib: "18:00", isha: "19:17" },
            { day: 7, fajr: "05:08", dhuhr: "12:10", asr: "15:33", maghrib: "18:01", isha: "19:18" },
            { day: 8, fajr: "05:07", dhuhr: "12:09", asr: "15:33", maghrib: "18:01", isha: "19:18" },
            { day: 9, fajr: "05:06", dhuhr: "12:09", asr: "15:34", maghrib: "18:02", isha: "19:19" },
            { day: 10, fajr: "05:05", dhuhr: "12:09", asr: "15:34", maghrib: "18:02", isha: "19:19" },
            { day: 11, fajr: "05:05", dhuhr: "12:09", asr: "15:35", maghrib: "18:03", isha: "19:20" },
            { day: 12, fajr: "05:04", dhuhr: "12:09", asr: "15:35", maghrib: "18:03", isha: "19:20" },
            { day: 13, fajr: "05:03", dhuhr: "12:09", asr: "15:36", maghrib: "18:04", isha: "19:21" },
            { day: 14, fajr: "05:02", dhuhr: "12:09", asr: "15:36", maghrib: "18:04", isha: "19:21" },
            { day: 15, fajr: "05:01", dhuhr: "12:09", asr: "15:37", maghrib: "18:05", isha: "19:22" },
            { day: 16, fajr: "05:00", dhuhr: "12:08", asr: "15:37", maghrib: "18:05", isha: "19:22" },
            { day: 17, fajr: "04:59", dhuhr: "12:08", asr: "15:38", maghrib: "18:06", isha: "19:23" },
            { day: 18, fajr: "04:58", dhuhr: "12:08", asr: "15:38", maghrib: "18:06", isha: "19:23" },
            { day: 19, fajr: "04:57", dhuhr: "12:08", asr: "15:39", maghrib: "18:07", isha: "19:24" },
            { day: 20, fajr: "04:57", dhuhr: "12:08", asr: "15:39", maghrib: "18:07", isha: "19:24" },
            { day: 21, fajr: "04:56", dhuhr: "12:08", asr: "15:40", maghrib: "18:07", isha: "19:25" },
            { day: 22, fajr: "04:55", dhuhr: "12:08", asr: "15:40", maghrib: "18:08", isha: "19:25" },
            { day: 23, fajr: "04:54", dhuhr: "12:08", asr: "15:41", maghrib: "18:08", isha: "19:26" },
            { day: 24, fajr: "04:53", dhuhr: "12:08", asr: "15:41", maghrib: "18:09", isha: "19:26" },
            { day: 25, fajr: "04:52", dhuhr: "12:07", asr: "15:41", maghrib: "18:09", isha: "19:27" },
            { day: 26, fajr: "04:51", dhuhr: "12:07", asr: "15:42", maghrib: "18:10", isha: "19:27" },
            { day: 27, fajr: "04:50", dhuhr: "12:07", asr: "15:42", maghrib: "18:10", isha: "19:28" },
            { day: 28, fajr: "04:49", dhuhr: "12:07", asr: "15:43", maghrib: "18:10", isha: "19:28" },
            { day: 29, fajr: "04:48", dhuhr: "12:07", asr: "15:43", maghrib: "18:11", isha: "19:29" },
            { day: 30, fajr: "04:47", dhuhr: "12:07", asr: "15:44", maghrib: "18:11", isha: "19:29" }
        ];

        // জেলার অফসেট (মিনিটে) ঢাকা থেকে
        const districtOffset = {
            dhaka: 0, chittagong: -2, rajshahi: +4, khulna: +3,
            sylhet: -1, barisal: +2, rangpur: +5, mymensingh: +1
        };

        // জেলার নাম বাংলায়
        const districtNames = {
            dhaka: 'ঢাকা', chittagong: 'চট্টগ্রাম', rajshahi: 'রাজশাহী',
            khulna: 'খুলনা', sylhet: 'সিলেট', barisal: 'বরিশাল',
            rangpur: 'রংপুর', mymensingh: 'ময়মনসিংহ'
        };

        // সব জেলার টাইম জেনারেট
        function generateAllDistrictTimes() {
            let all = {};
            for (let dist in districtOffset) {
                let offset = districtOffset[dist];
                let times = dhakaTimes.map(item => {
                    let [sh, sm] = item.sehri.split(':').map(Number);
                    let [ih, im] = item.iftar.split(':').map(Number);
                    
                    let newSehriMin = sh * 60 + sm + offset;
                    let newIftarMin = ih * 60 + im + offset;
                    
                    // নেতিবাচক মান এড়ানো
                    while (newSehriMin < 0) newSehriMin += 24 * 60;
                    while (newIftarMin < 0) newIftarMin += 24 * 60;
                    
                    let shHour = Math.floor(newSehriMin / 60) % 24;
                    let shMin = newSehriMin % 60;
                    let ifHour = Math.floor(newIftarMin / 60) % 24;
                    let ifMin = newIftarMin % 60;
                    
                    return {
                        day: item.day,
                        date: item.date,
                        weekday: item.weekday,
                        sehri: `${shHour.toString().padStart(2, '0')}:${shMin.toString().padStart(2, '0')}`,
                        iftar: `${ifHour.toString().padStart(2, '0')}:${ifMin.toString().padStart(2, '0')}`
                    };
                });
                all[dist] = times;
            }
            return all;
        }

        // সব জেলার নামাজের সময় জেনারেট
        function generateAllPrayerTimes() {
            let all = {};
            for (let dist in districtOffset) {
                let offset = districtOffset[dist];
                let times = dhakaPrayerTimes.map(item => {
                    function adjustTime(timeStr) {
                        let [h, m] = timeStr.split(':').map(Number);
                        let totalMin = h * 60 + m + offset;
                        while (totalMin < 0) totalMin += 24 * 60;
                        while (totalMin >= 24 * 60) totalMin -= 24 * 60;
                        let newH = Math.floor(totalMin / 60) % 24;
                        let newM = totalMin % 60;
                        return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
                    }
                    
                    return {
                        day: item.day,
                        fajr: adjustTime(item.fajr),
                        dhuhr: adjustTime(item.dhuhr),
                        asr: adjustTime(item.asr),
                        maghrib: adjustTime(item.maghrib),
                        isha: adjustTime(item.isha)
                    };
                });
                all[dist] = times;
            }
            return all;
        }

        const allDistricts = generateAllDistrictTimes();
        const allPrayerTimes = generateAllPrayerTimes();
        let currentDistrict = 'dhaka';

        // বর্তমান রমজান দিন নির্ণয়
        function getCurrentRamadanDay() {
            const today = new Date();
            const ramadanStart = new Date(2026, 1, 19); // ১৯ ফেব্রুয়ারি ২০২৬
            
            if (today < ramadanStart) return 1;
            
            const ramadanEnd = new Date(2026, 2, 20); // ২০ মার্চ ২০২৬
            if (today > ramadanEnd) return 30;
            
            const diffTime = today - ramadanStart;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            let ramadanDay = diffDays + 1;
            
            if (ramadanDay < 1) ramadanDay = 1;
            if (ramadanDay > 30) ramadanDay = 30;
            
            return ramadanDay;
        }

        function pad(num) { return num.toString().padStart(2, '0'); }

        function getTargetTimes(district) {
            const todayDay = getCurrentRamadanDay();
            const times = allDistricts[district];
            
            const todayTime = times.find(t => t.day === todayDay) || times[0];
            const nextDayTime = times.find(t => t.day === todayDay + 1) || times.find(t => t.day === todayDay);
            
            const baseDate = new Date(2026, 1, 18 + todayDay);
            
            const [sh, sm] = todayTime.sehri.split(':').map(Number);
            const [ih, im] = todayTime.iftar.split(':').map(Number);
            
            const todaySehri = new Date(baseDate);
            todaySehri.setHours(sh, sm, 0, 0);
            
            const todayIftar = new Date(baseDate);
            todayIftar.setHours(ih, im, 0, 0);
            
            const nextDate = new Date(2026, 1, 19 + todayDay);
            const [nsh, nsm] = nextDayTime.sehri.split(':').map(Number);
            const [nih, nim] = nextDayTime.iftar.split(':').map(Number);
            
            const nextSehri = new Date(nextDate);
            nextSehri.setHours(nsh, nsm, 0, 0);
            
            const nextIftar = new Date(nextDate);
            nextIftar.setHours(nih, nim, 0, 0);

            const now = new Date();
            
            let sehriTarget = (now < todaySehri) ? todaySehri : nextSehri;
            let iftarTarget = (now < todayIftar) ? todayIftar : nextIftar;

            return { 
                sehriTarget, iftarTarget, todaySehri, todayIftar,
                todayDay, todayInfo: todayTime, nextDayInfo: nextDayTime
            };
        }

        // ৫ ওয়াক্ত নামাজের সময় আপডেট
        function updatePrayerTimes(district) {
            const todayDay = getCurrentRamadanDay();
            const prayerTimes = allPrayerTimes[district];
            const todayPrayer = prayerTimes.find(t => t.day === todayDay) || prayerTimes[0];
            
            document.getElementById('fajr-time').innerHTML = to12HourFormat(todayPrayer.fajr);
            document.getElementById('dhuhr-time').innerHTML = to12HourFormat(todayPrayer.dhuhr);
            document.getElementById('asr-time').innerHTML = to12HourFormat(todayPrayer.asr);
            document.getElementById('maghrib-time').innerHTML = to12HourFormat(todayPrayer.maghrib);
            document.getElementById('isha-time').innerHTML = to12HourFormat(todayPrayer.isha);
        }

        // টেবিল রেন্ডার ফাংশন (৩টি টেবিলে ভাগ করা)
        function renderTables(district) {
            const times = allDistricts[district];
            const todayDay = getCurrentRamadanDay();
            
            // প্রথম ১০ দিন (১-১০)
            let firstHtml = '';
            times.slice(0, 10).forEach(item => {
                const isToday = (item.day === todayDay);
                const dayInBangla = toBanglaNumber(item.day);
                const todayTag = isToday ? '<br><small style="font-weight:normal;">আজ</small>' : '';
                
                firstHtml += `<tr ${isToday ? 'class="today-row"' : ''}>
                    <td>${dayInBangla}${todayTag}</td>
                    <td>${item.date}</td>
                    <td>${item.weekday}</td>
                    <td>${to12HourFormat(item.sehri)}</td>
                    <td>${to12HourFormat(item.iftar)}</td>
                </tr>`;
            });
            document.getElementById('first-ten-days').innerHTML = firstHtml;

            // ২য় ১০ দিন (১১-২০)
            let secondHtml = '';
            times.slice(10, 20).forEach(item => {
                const isToday = (item.day === todayDay);
                const dayInBangla = toBanglaNumber(item.day);
                const todayTag = isToday ? '<br><small style="font-weight:normal;">আজ</small>' : '';
                
                secondHtml += `<tr ${isToday ? 'class="today-row"' : ''}>
                    <td>${dayInBangla}${todayTag}</td>
                    <td>${item.date}</td>
                    <td>${item.weekday}</td>
                    <td>${to12HourFormat(item.sehri)}</td>
                    <td>${to12HourFormat(item.iftar)}</td>
                </tr>`;
            });
            document.getElementById('second-ten-days').innerHTML = secondHtml;

            // শেষ ১০ দিন (২১-৩০)
            let lastHtml = '';
            times.slice(20, 30).forEach(item => {
                const isToday = (item.day === todayDay);
                const dayInBangla = toBanglaNumber(item.day);
                const todayTag = isToday ? '<br><small style="font-weight:normal;">আজ</small>' : '';
                
                lastHtml += `<tr ${isToday ? 'class="today-row"' : ''}>
                    <td>${dayInBangla}${todayTag}</td>
                    <td>${item.date}</td>
                    <td>${item.weekday}</td>
                    <td>${to12HourFormat(item.sehri)}</td>
                    <td>${to12HourFormat(item.iftar)}</td>
                </tr>`;
            });
            document.getElementById('last-ten-days').innerHTML = lastHtml;
        }

        function updateUI() {
            const dist = currentDistrict;
            const targets = getTargetTimes(dist);
            const now = new Date();
            const todayDay = targets.todayDay;
            const todayInfo = targets.todayInfo;

            // আজকের তারিখ ও বার আপডেট (বাংলা সংখ্যায়)
            const dayInBangla = toBanglaNumber(todayDay);
            document.getElementById('today-date-label').innerHTML = `📅 আজ ${dayInBangla} রমজান — ${todayInfo.weekday}`;

            // জেলার নাম আপডেট
            document.getElementById('district-name').textContent = districtNames[dist];

            // আজকের সময় আপডেট (১২ ঘন্টা ফরম্যাটে)
            const sehriHour = targets.todaySehri.getHours();
            const sehriMin = targets.todaySehri.getMinutes();
            const iftarHour = targets.todayIftar.getHours();
            const iftarMin = targets.todayIftar.getMinutes();
            
            // সেহরি (AM/PM)
            let sehriHour12 = sehriHour % 12;
            sehriHour12 = sehriHour12 ? sehriHour12 : 12;
            const sehriAmpm = sehriHour >= 12 ? 'PM' : 'AM';
            
            // ইফতার (AM/PM)
            let iftarHour12 = iftarHour % 12;
            iftarHour12 = iftarHour12 ? iftarHour12 : 12;
            const iftarAmpm = iftarHour >= 12 ? 'PM' : 'AM';
            
            const sehriBangla = toBanglaNumber(sehriHour12.toString().padStart(2, '0')) + ':' + toBanglaNumber(sehriMin.toString().padStart(2, '0'));
            const iftarBangla = toBanglaNumber(iftarHour12.toString().padStart(2, '0')) + ':' + toBanglaNumber(iftarMin.toString().padStart(2, '0'));
            
            document.getElementById('today-sehri').innerHTML = 
                `${sehriBangla} <span class="unit">${sehriAmpm}</span>`;
            document.getElementById('today-iftar').innerHTML = 
                `${iftarBangla} <span class="unit">${iftarAmpm}</span>`;

            // সেহরি কাউন্টডাউন
            let sehriDiff = Math.max(0, targets.sehriTarget - now);
            const sh = Math.floor(sehriDiff / (1000 * 60 * 60));
            const sm = Math.floor((sehriDiff % (1000 * 60 * 60)) / (1000 * 60));
            const ss = Math.floor((sehriDiff % (1000 * 60)) / 1000);
            document.getElementById('sehri-countdown').innerText = `${pad(sh)}:${pad(sm)}:${pad(ss)}`;

            // ইফতার কাউন্টডাউন
            let iftarDiff = Math.max(0, targets.iftarTarget - now);
            const ih = Math.floor(iftarDiff / (1000 * 60 * 60));
            const im = Math.floor((iftarDiff % (1000 * 60 * 60)) / (1000 * 60));
            const isec = Math.floor((iftarDiff % (1000 * 60)) / 1000);
            document.getElementById('iftar-countdown').innerText = `${pad(ih)}:${pad(im)}:${pad(isec)}`;

            // ৫ ওয়াক্ত নামাজের সময় আপডেট
            updatePrayerTimes(dist);

            // টেবিল রেন্ডার
            renderTables(dist);
        }

        window.updateDistrict = function() {
            const select = document.getElementById('district');
            currentDistrict = select.value;
            updateUI();
        };

        // প্রতি সেকেন্ডে আপডেট
        setInterval(updateUI, 1000);
        
        // প্রথম লোডে
        window.onload = function() { 
            updateDistrict(); 
            
            // ৫ সেকেন্ড পর পপআপ দেখাও
            setTimeout(showIslamicMessageModal, 5000);
        };

        // ========== ইসলামিক বাণী ডাটাবেস ==========
        const islamicMessages = [
            {
                arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
                pronunciation: "ইন্নাল্লাহা মা'আস সাবিরীন",
                meaning: "নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সাথে আছেন। (সূরা বাকারাহ: ১৫৩)"
            },
            {
                arabic: "وَتَوَكَّلْ عَلَى اللَّهِ ۚ وَكَفَىٰ بِاللَّهِ وَكِيلًا",
                pronunciation: "ওয়া তাওয়াক্কাল 'আলাল্লাহ, ওয়া কাফা বিল্লাহি ওয়াকিলা",
                meaning: "এবং আপনি আল্লাহর উপর ভরসা করুন। আর আল্লাহই যথেষ্ট কর্মবিধায়ক। (সূরা আহযাব: ৩)"
            },
            {
                arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
                pronunciation: "রাব্বানা আতিনা ফিদ্দুনিয়া হাসানাতাও ওয়া ফিল আখিরাতি হাসানাতাও ওয়া কিনা আযাবান্নার",
                meaning: "হে আমাদের পালনকর্তা! আমাদেরকে দুনিয়ায় কল্যাণ দিন এবং আখিরাতেও কল্যাণ দিন এবং আমাদেরকে আগুনের আযাব থেকে রক্ষা করুন। (সূরা বাকারাহ: ২০১)"
            },
            {
                arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
                pronunciation: "ফাযকুরুনী আযকুরকুম ওয়াশকুরু লী ওয়ালা তাকফুরুন",
                meaning: "অতএব, তোমরা আমাকে স্মরণ কর, আমিও তোমাদের স্মরণ রাখব। তোমরা আমার কৃতজ্ঞতা প্রকাশ কর এবং অকৃতজ্ঞ হয়ো না। (সূরা বাকারাহ: ১৫২)"
            },
            {
                arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ ۖ إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ",
                pronunciation: "ওয়ালা তাইয়াসু মির রাওহিল্লাহি, ইন্নাহু লা ইয়াইয়াসু মির রাওহিল্লাহি ইল্লাল কাওমুল কাফিরুন",
                meaning: "আর তোমরা আল্লাহর রহমত থেকে নিরাশ হয়ো না। নিশ্চয়ই আল্লাহর রহমত থেকে শুধু কাফির সম্প্রদায়ই নিরাশ হয়। (সূরা ইউসুফ: ৮৭)"
            },
            {
                arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
                pronunciation: "ওয়া মাই ইয়াত্তাকিল্লাহা ইয়াজ'আল লাহু মাখরাজাও ওয়া ইয়ারযুকহু মিন হাইসু লা ইয়াহতাসিব",
                meaning: "যে ব্যক্তি আল্লাহকে ভয় করে, তিনি তার জন্য (সমস্যা থেকে) বের হওয়ার পথ করে দেন এবং তাকে এমন উৎস থেকে রিযিক দেন যা সে কল্পনাও করতে পারে না। (সূরা তালাক: ২-৩)"
            },
            {
                arabic: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا",
                pronunciation: "লা তাহযান ইন্নাল্লাহা মা'আনা",
                meaning: "দুঃখ করো না, নিশ্চয়ই আল্লাহ আমাদের সাথে আছেন। (সূরা তওবা: ৪০)"
            },
            {
                arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
                pronunciation: "ইন্না মা'আল উসরি ইউসরা",
                meaning: "নিশ্চয়ই কষ্টের সাথে স্বস্তি আছে। (সূরা ইনশিরাহ: ৬)"
            },
            {
                arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ",
                pronunciation: "ওয়া ইযা ছাআলাকা 'ইবাদী 'আন্নী ফাইন্নী কারীব, উজীবু দা'ওয়াতাদ দা'ই ইযা দা'আন",
                meaning: "যখন আমার বান্দারা আমার সম্পর্কে জিজ্ঞাসা করে, (বলে দাও) আমি নিশ্চয়ই তাদের খুব কাছেই আছি। যে আমার কাছে প্রার্থনা করে, আমি তার প্রার্থনা কবুল করি। (সূরা বাকারাহ: ১৮৬)"
            },
            {
                arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا إِنَّ مَعَ الْعُسْرِ يُسْرًا",
                pronunciation: "ফাইন্না মা'আল উসরি ইউসরা, ইন্না মা'আল উসরি ইউসরা",
                meaning: "অতএব, নিশ্চয়ই কষ্টের সাথে স্বস্তি আছে। নিশ্চয়ই কষ্টের সাথে স্বস্তি আছে। (সূরা ইনশিরাহ: ৫-৬)"
            },
            {
                arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
                pronunciation: "রাব্বিশরাহ লী ছাদরী, ওয়া ইয়াসসির লী আমরী",
                meaning: "হে আমার পালনকর্তা! আমার বক্ষ উন্মুক্ত করে দিন, আমার কাজ সহজ করে দিন। (সূরা ত্বোয়া-হা: ২৫-২৬)"
            },
            {
                arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَىٰ وَالتُّقَىٰ وَالْعَفَافَ وَالْغِنَىٰ",
                pronunciation: "আল্লাহুম্মা ইন্নী আসআলুকাল হুদা, ওয়াত্তুক্বা, ওয়াল 'আফাফা, ওয়াল গিনা",
                meaning: "হে আল্লাহ! আমি আপনার কাছে হেদায়েত, তাকওয়া, পবিত্রতা ও স্বচ্ছলতা প্রার্থনা করছি। (মুসলিম)"
            },
            {
                arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
                pronunciation: "খাইরুকুম মান তা'আল্লামাল কুরআনা ওয়া 'আল্লামাহু",
                meaning: "তোমাদের মধ্যে সেই উত্তম ব্যক্তি যে কুরআন শেখে এবং অন্যদের শেখায়। (বুখারী)"
            },
            {
                arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
                pronunciation: "আল-মুসলিমু মান ছালিমাল মুসলিমুনা মিন লিসানিহি ওয়া ইয়াদিহি",
                meaning: "সেই প্রকৃত মুসলিম যার জিহ্বা ও হাত থেকে অন্য মুসলিমরা নিরাপদ থাকে। (বুখারী)"
            },
            {
                arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّىٰ يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
                pronunciation: "লা ইউ'মিনু আহাদুকুম হাত্তা ইউহিব্বা লি-আখিহি মা ইউহিব্বু লি-নাফসিহি",
                meaning: "তোমাদের কেউ ততক্ষণ পর্যন্ত পূর্ণ মুমিন হতে পারবে না, যতক্ষণ না সে তার ভাইয়ের জন্য তা-ই পছন্দ করে যা সে নিজের জন্য পছন্দ করে। (বুখারী)"
            },
            {
                arabic: "الْكَيِّسُ مَنْ دَانَ نَفْسَهُ وَعَمِلَ لِمَا بَعْدَ الْمَوْتِ",
                pronunciation: "আল-কাইয়্যিসু মান দানা নাফসাহু ওয়া 'আমিলা লিমা বা'দাল মাওত",
                meaning: "বুদ্ধিমান সেই ব্যক্তি যে নিজেকে নিয়ন্ত্রণে রাখে এবং মৃত্যুর পরবর্তী জীবনের জন্য আমল করে। (তিরমিজি)"
            },
            {
                arabic: "إِيَّاكُمْ وَالظَّنَّ، فَإِنَّ الظَّنَّ أَكْذَبُ الْحَدِيثِ",
                pronunciation: "ইয়্যাকুম ওয়াজ়-জ়ান্না, ফাইন্নাজ়-জ়ান্না আকযাবুল হাদীছ",
                meaning: "তোমরা ধারণা (খারাপ ধারণা) থেকে দূরে থাক, কারণ ধারণা সবচেয়ে বড় মিথ্যা। (বুখারী)"
            },
            {
                arabic: "لَا ضَرَرَ وَلَا ضِرَارَ",
                pronunciation: "লা দারারা ওয়া লা দিরারা",
                meaning: "নিজের বা অন্যের ক্ষতি করা যাবে না। (ইবনে মাজাহ)"
            },
            {
                arabic: "الدُّعَاءُ هُوَ الْعِبَادَةُ",
                pronunciation: "আদ-দু'আউ হুয়াল 'ইবাদাহ",
                meaning: "দোয়াই হলো ইবাদত। (তিরমিজি)"
            },
            {
                arabic: "الْحَيَاءُ لَا يَأْتِي إِلَّا بِخَيْرٍ",
                pronunciation: "আল-হায়াউ লা ইয়া'তী ইল্লা বি-খাইরিন",
                meaning: "লজ্জা শুধুমাত্র কল্যাণই বয়ে আনে। (বুখারী)"
            },
            {
                arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
                pronunciation: "তাবাসসুমুকা ফী ওয়াজহি আখিকা ছাদাকাহ",
                meaning: "তোমার ভাইয়ের মুখমণ্ডলে হাসি দেওয়াও সদকা। (তিরমিজি)"
            },
            {
                arabic: "الْمُسْلِمُ أَخُو الْمُسْلِمِ، لَا يَظْلِمُهُ وَلَا يُسْلِمُهُ",
                pronunciation: "আল-মুসলিমু আখুল মুসলিমি, লা ইয়াজলিমুহু ওয়া লা ইউসলিমুহু",
                meaning: "মুসলিম মুসলিমের ভাই। সে তার উপর অত্যাচার করে না এবং তাকে অসহায় অবস্থায় ছেড়ে দেয় না। (বুখারী)"
            },
            {
                arabic: "مَنْ لَا يَرْحَمْ لَا يُرْحَمْ",
                pronunciation: "মান লা ইয়ারহাম লা ইউরহাম",
                meaning: "যে দয়া করে না, তার প্রতি দয়া করা হয় না। (বুখারী)"
            },
            {
                arabic: "الْبَيِّعَانِ بِالْخِيَارِ مَا لَمْ يَتَفَرَّقَا",
                pronunciation: "আল-বাই'আনি বিল-খিয়ারি মা লাম ইয়াতাফাররাকা",
                meaning: "ক্রেতা-বিক্রেতা ততক্ষণ পর্যন্ত স্বাধীন যতক্ষণ তারা পৃথক না হয়। (বুখারী)"
            },
            {
                arabic: "لَا حَسَدَ إِلَّا فِي اثْنَتَيْنِ",
                pronunciation: "লা হাসাদা ইল্লা ফিসনাতায়নি",
                meaning: "দুটি বিষয় ছাড়া (কাউকে) হিংসা করা যায় না। (বুখারী)"
            },
            {
                arabic: "الْأَرْوَاحُ جُنُودٌ مُجَنَّدَةٌ",
                pronunciation: "আল-আরওয়াহু জুনুদুম মুজান্নাদাহ",
                meaning: "আত্মাগুলো একত্রিত বাহিনী (একে অপরের সাথে পরিচিত)। (বুখারী)"
            },
            {
                arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
                pronunciation: "ইন্নামাল আ'মালু বিন-নিয়্যাত",
                meaning: "সকল কাজের ফলাফল নিয়তের উপর নির্ভরশীল। (বুখারী)"
            },
            {
                arabic: "الدِّينُ النَّصِيحَةُ",
                pronunciation: "আদ-দীনু আন-নাসীহাহ",
                meaning: "দীন হলো (সবার প্রতি) কল্যাণ কামনা করা। (মুসলিম)"
            },
            {
                arabic: "الْحَلَالُ بَيِّنٌ وَالْحَرَامُ بَيِّنٌ",
                pronunciation: "আল-হালালু বাইয়্যিনুন ওয়াল-হারামু বাইয়্যিনুন",
                meaning: "হালাল স্পষ্ট এবং হারামও স্পষ্ট। (বুখারী)"
            },
            {
                arabic: "رَحِمَ اللَّهُ رَجُلًا سَمْحًا إِذَا بَاعَ، وَإِذَا اشْتَرَىٰ، وَإِذَا اقْتَضَىٰ",
                pronunciation: "রাহিমাল্লাহু রাজুলান সামহান ইযা বা'আ, ওয়া ইযাশতারাহ, ওয়া ইযাকতাদাহ",
                meaning: "আল্লাহ সেই ব্যক্তির প্রতি দয়া করুন, যে সহজভাবে বিক্রি করে, সহজভাবে কেনে এবং সহজভাবে দাবি আদায় করে। (বুখারী)"
            },
            {
                arabic: "أَفْشُوا السَّلَامَ بَيْنَكُمْ",
                pronunciation: "আফশুস সালামা বাইনাকুম",
                meaning: "তোমাদের মধ্যে সালাম (শান্তি) প্রচার কর। (মুসলিম)"
            },
            {
                arabic: "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا",
                pronunciation: "আল-মু'মিনু লিল-মু'মিনি কাল-বুনইয়ানি ইয়াশুদ্দু বা'দুহু বা'দান",
                meaning: "মুমিন মুমিনের জন্য একটি শক্তিশালী প্রাচীরের মতো, যার এক অংশ অপর অংশকে শক্তিশালী করে। (বুখারী)"
            },
            {
                arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ",
                pronunciation: "ইত্তাকিল্লাহা হাইসুমা কুন্তা",
                meaning: "তুমি যেখানেই থাক, আল্লাহকে ভয় কর। (তিরমিজি)"
            },
            {
                arabic: "وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا",
                pronunciation: "ওয়া আতবি'ইস সাইয়্যি'আতাল হাসানাতা তামহুহা",
                meaning: "ভুলের পর সৎকাজ কর, তা ভুলকে মুছে দেবে। (তিরমিজি)"
            },
            {
                arabic: "وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
                pronunciation: "ওয়া খালিকিন নাসা বিখুলুকিন হাসানিন",
                meaning: "মানুষের সাথে উত্তম আচরণ কর। (তিরমিজি)"
            },
            {
                arabic: "لَا تَغْضَبْ وَلَكَ الْجَنَّةُ",
                pronunciation: "লা তাগদাব ওয়া লাকাল জান্নাহ",
                meaning: "রাগ করো না, তোমার জন্য জান্নাত। (তাবরানি)"
            },
            {
                arabic: "السَّخِيُّ قَرِيبٌ مِنَ اللَّهِ قَرِيبٌ مِنَ النَّاسِ قَرِيبٌ مِنَ الْجَنَّةِ",
                pronunciation: "আস-সাখিয়্যু কারীবুম মিনাল্লাহি, কারীবুম মিনান্নাসি, কারীবুম মিনাল জান্নাহ",
                meaning: "দানশীল ব্যক্তি আল্লাহর কাছে, মানুষদের কাছে এবং জান্নাতের কাছে। (তিরমিজি)"
            },
            {
                arabic: "الْبَخِيلُ بَعِيدٌ مِنَ اللَّهِ بَعِيدٌ مِنَ النَّاسِ بَعِيدٌ مِنَ الْجَنَّةِ",
                pronunciation: "আল-বাখিলু বাঈদুম মিনাল্লাহি, বাঈদুম মিনান্নাসি, বাঈদুম মিনাল জান্নাহ",
                meaning: "কৃপণ ব্যক্তি আল্লাহর কাছ থেকে, মানুষদের কাছ থেকে এবং জান্নাত থেকে দূরে। (তিরমিজি)"
            },
            {
                arabic: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",
                pronunciation: "ইন্নাল্লাহা জামিলুন ইউহিব্বুল জামাল",
                meaning: "নিশ্চয়ই আল্লাহ সুন্দর এবং তিনি সৌন্দর্য পছন্দ করেন। (মুসলিম)"
            },
            {
                arabic: "الدُّعَاءُ سِلَاحُ الْمُؤْمِنِ",
                pronunciation: "আদ-দু'আউ সিলাহুল মু'মিন",
                meaning: "দোয়া মুমিনের অস্ত্র। (হাকিম)"
            },
            {
                arabic: "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
                pronunciation: "মান ছামা রামাদানা ইমানাও ওয়াহতিসাবান গুফিরা লাহু মা তাকাদ্দামা মিন জাম্বিহি",
                meaning: "যে ব্যক্তি ঈমানের সাথে ও সওয়াবের আশায় রমজানের রোজা রাখে, তার পূর্ববর্তী গুনাহ মাফ করে দেওয়া হয়। (বুখারী)"
            },
            {
                arabic: "مَنْ قَامَ لَيْلَةَ الْقَدْرِ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
                pronunciation: "মান কামা লাইলাতাল কাদরি ইমানাও ওয়াহতিসাবান গুফিরা লাহু মা তাকাদ্দামা মিন জাম্বিহি",
                meaning: "যে ব্যক্তি ঈমানের সাথে ও সওয়াবের আশায় লাইলাতুল কদরে ইবাদত করে, তার পূর্ববর্তী গুনাহ মাফ করে দেওয়া হয়। (বুখারী)"
            },
            {
                arabic: "أَكْثِرُوا الصَّلَاةَ عَلَيَّ يَوْمَ الْجُمُعَةِ",
                pronunciation: "আকছিরুস সোলাতা 'আলাইয়্যা ইয়াওমাল জুমু'আহ",
                meaning: "জুমুআর দিনে আমার উপর বেশি বেশি দরুদ পড়। (আবু দাউদ)"
            },
            {
                arabic: "خَيْرُ يَوْمٍ طَلَعَتْ عَلَيْهِ الشَّمْسُ يَوْمُ الْجُمُعَةِ",
                pronunciation: "খাইরু ইয়াওমিন তালা'আত 'আলাইহিশ শামসু ইয়াওমুল জুমু'আহ",
                meaning: "সূর্য উদয় হওয়া দিনগুলোর মধ্যে উত্তম দিন হলো জুমুআর দিন। (মুসলিম)"
            },
            {
                arabic: "لَا يُلْدَغُ الْمُؤْمِنُ مِنْ جُحْرٍ وَاحِدٍ مَرَّتَيْنِ",
                pronunciation: "লা ইউলদাগুল মু'মিনু মিন জুহরিও ওয়াহিদিন মাররাতায়ন",
                meaning: "মুমিন এক গর্ত থেকে দুইবার দংশিত হয় না। (বুখারী)"
            },
            {
                arabic: "إِنَّمَا الْعِلْمُ بِالتَّعَلُّمِ",
                pronunciation: "ইন্নামাল 'ইলমু বিতা'আল্লুম",
                meaning: "জ্ঞান অর্জনের মাধ্যমেই জ্ঞান লাভ করা যায়। (তাবারানি)"
            },
            {
                arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَىٰ كُلِّ مُسْلِمٍ",
                pronunciation: "তালাবুল 'ইলমি ফারিদাতুন 'আলা কুল্লি মুসলিমিন",
                meaning: "জ্ঞান অর্জন করা প্রত্যেক মুসলিমের জন্য ফরজ। (ইবনে মাজাহ)"
            },
            {
                arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
                pronunciation: "আল-মুসলিমু মান ছালিমাল মুসলিমুনা মিন লিসানিহি ওয়া ইয়াদিহি",
                meaning: "সেই প্রকৃত মুসলিম যার জিহ্বা ও হাত থেকে অন্য মুসলিমরা নিরাপদ থাকে। (বুখারী)"
            },
            {
                arabic: "إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ",
                pronunciation: "ইযা মাতাল ইনসানু ইনকাতা'আ 'আনহু 'আমালুহু ইল্লা মিন ছালাছিন",
                meaning: "মানুষ মারা গেলে তার আমল বন্ধ হয়ে যায়, তবে তিনটি কাজ চলতে থাকে। (মুসলিম)"
            },
            {
                arabic: "صَدَقَةٌ تُجْرَىٰ، أَوْ عِلْمٌ يُنْتَفَعُ بِهِ، أَوْ وَلَدٌ صَالِحٌ يَدْعُو لَهُ",
                pronunciation: "ছাদাকাতুন তুজরা, আও 'ইলমুন ইউনতাফা'উ বিহি, আও ওয়ালাদুন সালিহুন ইয়াদ'উ লাহু",
                meaning: "চলতি সদকা, উপকারী জ্ঞান এবং সন্তান যে তার জন্য দোয়া করে। (মুসলিম)"
            },
            {
                arabic: "لَا تَحَاسَدُوا وَلَا تَنَاجَشُوا وَلَا تَبَاغَضُوا وَلَا تَدَابَرُوا",
                pronunciation: "লা তাহাসাদু, ওয়া লা তানাজাশু, ওয়া লা তাবাগাদু, ওয়া লা তাদাবারু",
                meaning: "তোমরা পরস্পর হিংসা করো না, প্রতারণা করো না, বিদ্বেষ করো না এবং বিমুখ হয়ো না। (মুসলিম)"
            },
            {
                arabic: "وَكُونُوا عِبَادَ اللَّهِ إِخْوَانًا",
                pronunciation: "ওয়া কুনু 'ইবাদাল্লাহি ইখওয়ানা",
                meaning: "তোমরা আল্লাহর বান্দা হয়ে পরস্পর ভাই ভাই হয়ে যাও। (বুখারী)"
            }
        ];

        // এলোমেলো বাণী নির্বাচনের ফাংশন
        function getRandomIslamicMessage() {
            const randomIndex = Math.floor(Math.random() * islamicMessages.length);
            return islamicMessages[randomIndex];
        }

        // পপআপ দেখানোর ফাংশন
        function showIslamicMessageModal() {
            const message = getRandomIslamicMessage();
            
            document.getElementById('modal-arabic').textContent = message.arabic;
            document.getElementById('modal-pronunciation').textContent = `উচ্চারণ: ${message.pronunciation}`;
            document.getElementById('modal-meaning').textContent = `অর্থ: ${message.meaning}`;
            
            document.getElementById('islamic-message-modal').style.display = 'block';
        }

        // পপআপ বন্ধ করার ফাংশন
        function closeIslamicMessageModal() {
            document.getElementById('islamic-message-modal').style.display = 'none';
        }

        // মডালের বাইরে ক্লিক করলে বন্ধ হবে
        window.onclick = function(event) {
            const modal = document.getElementById('islamic-message-modal');
            if (event.target === modal) {
                closeIslamicMessageModal();
            }
        };
    })();