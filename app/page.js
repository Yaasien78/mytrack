'use client'
import { useState } from 'react'
import PiLoginButton from './components/PiLoginButton'

const KOSONG = { nama: '', ttl: '', pekerjaan: '', alamat: '', no_telpon: '', wa: '', gmail: '' }

export default function MyTrack() {
  const [user, setUser] = useState(null) // {user_id, pi_username}
  const [form, setForm] = useState(KOSONG)

  // 1. Pas Login Pi -> Load data dia dari HP ini
  const onLogin = (piUser) => {
    setUser(piUser)
    const key = `mytrack_${piUser.user_id}` // Kunci unik per Pi UID
    const saved = localStorage.getItem(key)
    setForm(saved? JSON.parse(saved) : KOSONG)
  }

  // 2. Simpan -> Ke HP doang
  const handleSimpan = () => {
    if(!user) return alert('Login Pi dulu bro')
    const key = `mytrack_${user.user_id}`
    localStorage.setItem(key, JSON.stringify(form))
    alert(`✅ Tersimpan di HP ini untuk @${user.pi_username}`)
  }

  // 3. Backup -> Download.json biar gak hilang pas update Pi
  const handleBackup = () => {
    if(!user) return alert('Login Pi dulu')
    const key = `mytrack_${user.user_id}`
    const data = localStorage.getItem(key) || JSON.stringify(KOSONG)
    const blob = new Blob([data], {type: 'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `MyTrack_${user.pi_username}.json`; a.click()
    URL.revokeObjectURL(url)
  }

  // 4. Import -> Balikin data dari.json
  const handleImport = (e) => {
    const file = e.target.files[0];
    if(!file ||!user) return alert('Login Pi dulu');
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        localStorage.setItem(`mytrack_${user.user_id}`, JSON.stringify(data));
        setForm(data);
        alert('✅ Data berhasil diimport')
      } catch {
        alert('❌ File rusak/bukan format MyTrack')
      }
    };
    reader.readAsText(file);
    e.target.value = null; // biar bisa import file yg sama 2x
  }

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

  // Halaman Login
  if(!user) {
    return (
      <div style={{padding:20, textAlign:'center', fontFamily:'sans-serif'}}>
        <h1>My Track Pi</h1>
        <p>Data cuma nyimpen di HP kamu. 100% Privasi. Offline.</p>
        <p style={{fontSize:12, color:'gray'}}>Kalo ganti HP, pake tombol Backup/Import</p>
        <PiLoginButton onLogin={onLogin} />
      </div>
    )
  }

  // Halaman Form
  return (
    <div style={{padding:20, maxWidth:500, margin:'auto', fontFamily:'sans-serif'}}>
      <h2>Halo @{user.pi_username}</h2>
      <p style={{fontSize:12, color:'gray', marginTop:-10}}>Data ini cuma ada di HP ini aja</p>

      <input name="nama" placeholder="Nama Lengkap" value={form.nama} onChange={handleChange} style={inputStyle}/>
      <input name="ttl" placeholder="Tempat, Tanggal Lahir" value={form.ttl} onChange={handleChange} style={inputStyle}/>
      <input name="pekerjaan" placeholder="Pekerjaan" value={form.pekerjaan} onChange={handleChange} style={inputStyle}/>
      <input name="alamat" placeholder="Alamat Palembang" value={form.alamat} onChange={handleChange} style={inputStyle}/>
      <input name="no_telpon" placeholder="No Telpon" value={form.no_telpon} onChange={handleChange} style={inputStyle}/>
      <input name="wa" placeholder="No WA" value={form.wa} onChange={handleChange} style={inputStyle}/>
      <input name="gmail" placeholder="Gmail" value={form.gmail} onChange={handleChange} style={inputStyle}/>

      <button onClick={handleSimpan} style={{...inputStyle, background:'#ffc300', fontWeight:'bold'}}>Simpan di HP</button>

      <div style={{display:'flex', gap:10}}>
        <button onClick={handleBackup} style={{...inputStyle, background:'#eee', flex:1}}>Backup.json</button>
        <input type="file" accept=".json" onChange={handleImport} style={{display:'none'}} id="importBtn"/>
        <label htmlFor="importBtn" style={{...inputStyle, background:'#eee', flex:1, textAlign:'center', cursor:'pointer', lineHeight:'40px', padding:0}}>Import.json</label>
      </div>

      <button onClick={() => setUser(null)} style={{...inputStyle, background:'#f44336', color:'#fff'}}>Ganti Akun Pi</button>
    </div>
  )
}

const inputStyle = {
  display:'block', width:'100%', boxSizing:'border-box',
  padding:12, margin:'8px 0', borderRadius:8,
  border:'1px solid #ccc', fontSize:16
    }
