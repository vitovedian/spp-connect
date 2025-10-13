<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Surat Tugas PIC - {{ $record['selected_pic']['name'] ?? '{Nama PIC}' }}</title>
    <style>
        @page {
            margin: 20px;
            size: A4;
        }
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
            color: #0f172a;
            font-size: 12px;
        }
        .date-place {
            text-align: right;
            margin-bottom: 20px;
        }
        .greeting { margin: 10px 0; }
        .content { margin: 20px 0; text-align: justify; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        th { background-color: #f0f0f0; }
        .signature-table {
            width: 40%;
            margin: 40px auto 0 0;
            border-collapse: collapse;
        }
        .signature-table td { border: none; padding: 15px 5px; }
        .alert {
            border: 1px dashed #f97316;
            background-color: #fff7ed;
            padding: 10px;
            margin: 16px 0;
            color: #9a3412;
        }
        .alert ul { margin: 6px 0 0 18px; padding: 0; }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 11px;
            color: #6b7280;
        }
    </style>
</head>
<body>
    @php
        $pic = $record['selected_pic'] ?? null;
        $client = $record['client_name'] ?? '{Nama Bank}';
        $jenisKegiatan = $record['activity_type'] === 'online' ? 'Online' : 'Offline';
        $rentangTanggal = $event_start && $event_end
            ? $event_start.' s.d. '.$event_end
            : ($event_start ?? '{Tanggal Kegiatan}');
    @endphp

    <div class="date-place">
        Jakarta, {{ $submitted_at ?? '{Tanggal berformat}' }}<br>
        Nomor Surat: {{ $formatted_letter_number }}
    </div>

    <div class="greeting">
        Ykh {{ $pic['name'] ?? '{Nama PIC}' }}<br>
        Assalamu’alaikum Wr.Wb.
    </div>

    <div class="content">
        <p>Semoga Allah SWT selalu melimpahkan rahmat dan karunia-Nya kepada kita semua. Aamiin YRA.</p>

        <p>Sehubungan dengan adanya kegiatan di {{ $client }} secara {{ strtolower($jenisKegiatan) }} maka kami menugaskan
            {{ $pic['name'] ?? '{Nama PIC}' }} sebagai PIC.</p>

        <p>Dengan agenda acara kegiatan:</p>

        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Kegiatan</th>
                    <th>Tanggal</th>
                    <th>Klien</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>{{ $record['activity_name'] }}</td>
                    <td>{{ $rentangTanggal }}</td>
                    <td>{{ $client }}</td>
                </tr>
            </tbody>
        </table>

        <p>Untuk itu Saudara ditugaskan untuk menjadi PIC acara tersebut.</p>

        <p>Demikian surat tugas ini kami sampaikan agar dilaksanakan dengan penuh tanggung jawab. Atas kerjasamanya kami ucapkan terima kasih.</p>

        <p>Wassalamu'alaikum Wr.Wb.</p>
    </div>

    @if(!empty($record['selected_pic_missing']))
        <div class="alert">
            <strong>Catatan:</strong>
            <ul>
                @foreach($record['selected_pic_missing'] as $item)
                    <li>{{ $item }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <table class="signature-table">
        <tr>
            <td>Manager,</td>
        </tr>
        <tr><td>&nbsp;</td></tr>
        <tr><td>&nbsp;</td></tr>
        <tr>
            <td>(..................)</td>
        </tr>
    </table>

    <div class="footer">
        Dokumen ini dihasilkan oleh sistem AP Operasional.
    </div>
</body>
</html>
