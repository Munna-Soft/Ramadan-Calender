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

        const allDistricts = generateAllDistrictTimes();
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
        };
    })();