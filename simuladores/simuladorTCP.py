import tkinter as tk
from tkinter import messagebox, ttk
import socket
import json
import random
import time
from datetime import datetime
from threading import Thread, Event

class DataSenderApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Simulador de Envio de Dados")
        
        self.host = tk.StringVar(value="127.0.0.1")
        self.port = tk.IntVar(value=65432)
        self.sensor_tipo = tk.IntVar(value=1)
        self.quantidade = tk.IntVar(value=1)
        self.intervalo_min = tk.DoubleVar(value=1.0)
        self.intervalo_max = tk.DoubleVar(value=2.0)
        self.codigo_usuario = tk.IntVar(value=1)
        self.cliente = None
        self.enviar_evento = Event()
        self.enviar_evento.clear()
        self.enviar_thread = None
        self.total_enviado = 0
        self.dados_restantes = []

        self.create_widgets()
    
    def create_widgets(self):

        frame_server = ttk.LabelFrame(self.root, text="Configuração do Servidor")
        frame_server.grid(row=0, column=0, padx=10, pady=10, sticky="ew")

        ttk.Label(frame_server, text="Host:").grid(row=0, column=0, padx=5, pady=5, sticky="e")
        self.host_entry = ttk.Entry(frame_server, textvariable=self.host)
        self.host_entry.grid(row=0, column=1, padx=5, pady=5)

        ttk.Label(frame_server, text="Porta:").grid(row=1, column=0, padx=5, pady=5, sticky="e")
        self.port_entry = ttk.Entry(frame_server, textvariable=self.port)
        self.port_entry.grid(row=1, column=1, padx=5, pady=5)

        self.connect_button = ttk.Button(frame_server, text="Conectar", command=self.connect_server)
        self.connect_button.grid(row=2, column=0, columnspan=2, pady=5)

        frame_params = ttk.LabelFrame(self.root, text="Parâmetros de Geração de Dados")
        frame_params.grid(row=1, column=0, padx=10, pady=10, sticky="ew")

        ttk.Label(frame_params, text="Tipo de Sensor:").grid(row=0, column=0, padx=5, pady=5, sticky="e")
        ttk.Combobox(frame_params, textvariable=self.sensor_tipo, values=[1, 2, 3]).grid(row=0, column=1, padx=5, pady=5)

        ttk.Label(frame_params, text="Quantidade:").grid(row=1, column=0, padx=5, pady=5, sticky="e")
        ttk.Entry(frame_params, textvariable=self.quantidade).grid(row=1, column=1, padx=5, pady=5)

        ttk.Label(frame_params, text="Intervalo Mínimo (s):").grid(row=2, column=0, padx=5, pady=5, sticky="e")
        ttk.Entry(frame_params, textvariable=self.intervalo_min).grid(row=2, column=1, padx=5, pady=5)

        ttk.Label(frame_params, text="Intervalo Máximo (s):").grid(row=3, column=0, padx=5, pady=5, sticky="e")
        ttk.Entry(frame_params, textvariable=self.intervalo_max).grid(row=3, column=1, padx=5, pady=5)

        ttk.Label(frame_params, text="Código do Usuário:").grid(row=4, column=0, padx=5, pady=5, sticky="e")
        ttk.Entry(frame_params, textvariable=self.codigo_usuario).grid(row=4, column=1, padx=5, pady=5)

        self.start_button = ttk.Button(frame_params, text="Iniciar Envio", command=self.start_sending, state="disabled")
        self.start_button.grid(row=5, column=0, padx=5, pady=5)

        self.stop_button = ttk.Button(frame_params, text="Parar Envio", command=self.stop_sending, state="disabled")
        self.stop_button.grid(row=5, column=1, padx=5, pady=5)

        self.disconnect_button = ttk.Button(self.root, text="Finalizar Conexão", command=self.disconnect_server, state="disabled")
        self.disconnect_button.grid(row=2, column=0, pady=5)

        frame_data = ttk.LabelFrame(self.root, text="Dados Enviados")
        frame_data.grid(row=3, column=0, padx=10, pady=10, sticky="ew")

        self.data_list = tk.Listbox(frame_data, height=10, width=110)
        self.data_list.pack(padx=5, pady=5, fill="both", expand=True)

        self.clear_list_button = ttk.Button(frame_data, text="Limpar Lista", command=self.clear_data_list)
        self.clear_list_button.pack(padx=5, pady=5)

    def connect_server(self):
        try:
            host = self.host.get()
            port = self.port.get()

            if not host:
                messagebox.showerror("Erro", "O endereço IP não pode estar vazio.")
                return

            try:
                socket.inet_aton(host)
            except socket.error:
                messagebox.showerror("Erro", "O endereço IP informado é inválido.")
                return

            if not port or not isinstance(port, int) or port < 1:
                messagebox.showerror("Erro", "Informe uma porta válida (> 1 ...).")
                return

            self.cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.cliente.connect((host, port))
            messagebox.showinfo("Conexão", f"Conectado ao servidor {host}:{port}.")
            self.connect_button.config(state="disabled")
            self.disconnect_button.config(state="normal")
            self.start_button.config(state="normal")
            self.host_entry.config(state="disabled")
            self.port_entry.config(state="disabled")
            self.clear_data_list()
        except Exception as e:
            messagebox.showerror("Erro", f"Não foi possível conectar ao servidor: {e}")

    def disconnect_server(self):
        if self.cliente:
            self.stop_sending()
            self.cliente.close()
            self.cliente = None
            messagebox.showinfo("Conexão", "Conexão encerrada.")
            self.connect_button.config(state="normal")
            self.disconnect_button.config(state="disabled")
            self.start_button.config(state="disabled")
            self.host_entry.config(state="normal")
            self.port_entry.config(state="normal")
            self.clear_data_list()

    def start_sending(self):
        if not self.validate_inputs():
            return

        self.enviar_evento.set()
        self.dados_restantes = list(range(1, self.quantidade.get() + 1))
        self.clear_data_list()
        self.enviar_thread = Thread(target=self.send_data)
        self.enviar_thread.start()
        self.start_button.config(state="disabled")
        self.stop_button.config(state="normal")

    def stop_sending(self):
        self.enviar_evento.clear()
        if self.enviar_thread:
            self.enviar_thread.join()
        self.start_button.config(state="normal")
        self.stop_button.config(state="disabled")

    def send_data(self):
        while self.dados_restantes and self.enviar_evento.is_set():
            dado = self.gerar_dado()
            try:
                self.cliente.sendall(json.dumps(dado).encode())
                self.data_list.insert(tk.END, f"Enviado: {dado}")
                self.dados_restantes.pop(0)
            except Exception as e:
                messagebox.showerror("Erro", f"Erro ao enviar dado: {e}")
                break
            time.sleep(random.uniform(self.intervalo_min.get(), self.intervalo_max.get()))

    def gerar_dado(self):
        normal = random.random() < 0.8
        valor1, valor2 = self.gerar_valores(self.sensor_tipo.get(), normal)
        return {
            "Valor1": valor1,
            "Valor2": valor2,
            "codigo": self.codigo_usuario.get(),
            "EmCasa": random.choice([True, False]),
            "DataHora": datetime.now().isoformat(),
            "Tipo": self.sensor_tipo.get(),
            "seq": random.randint(1, 100)
        }

    def gerar_valores(self, sensor_tipo, normal=True):
        if sensor_tipo == 1:
            if normal:
                return random.randint(110, 129), random.randint(70, 84)
            return random.choice(list(range(0, 110)) + list(range(130, 301))), random.choice(list(range(0, 70)) + list(range(85, 301)))
        elif sensor_tipo == 2:
            if normal:
                return random.randint(95, 100), random.randint(50, 100)
            return random.choice(list(range(0, 95))), random.choice(list(range(0, 50)) + list(range(101, 201)))
        elif sensor_tipo == 3:
            if normal:
                return round(random.uniform(36.0, 37.5), 1), None
            return round(random.choice(list(range(30, 36)) + list(range(38, 46))), 1), None
        raise ValueError("Tipo de sensor inválido.")

    def validate_inputs(self):
        if self.quantidade.get() < 1:
            messagebox.showerror("Erro", "A quantidade deve ser maior ou igual a 1.")
            return False
        if self.intervalo_min.get() < 1:
            messagebox.showerror("Erro", "O intervalo mínimo deve ser no mínimo 1 segundo.")
            return False
        if self.intervalo_max.get() < 2:
            messagebox.showerror("Erro", "O intervalo máximo deve ser no mínimo 2 segundos.")
            return False
        if self.intervalo_min.get() > self.intervalo_max.get():
            messagebox.showerror("Erro", "O intervalo mínimo deve ser menor ou igual ao intervalo máximo.")
            return False
        if self.codigo_usuario.get() < 1:
            messagebox.showerror("Erro", "O código do usuário deve ser maior que 0.")
            return False
        return True

    def clear_data_list(self):
        self.data_list.delete(0, tk.END)

if __name__ == "__main__":
    root = tk.Tk()
    app = DataSenderApp(root)
    root.mainloop()
