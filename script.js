document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");
  const tabs = document.querySelectorAll(".tab-content");
  const form = document.querySelector("#contact-form");
  const webhookUrl = "https://discord.com/api/webhooks/1333605277907288115/GEaR8V33jqCxc7dfltCbZ3fUp90I5cqkP87OQWJMN3gXc1FEaEdoeoHuBl72alWMKdGw";
  const notification = document.querySelector("#notification");

  if (notification) {
    const notificationMessage = document.querySelector("#notification-message");

    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetTab = link.dataset.tab;

        links.forEach(l => l.classList.remove("active"));
        tabs.forEach(tab => tab.classList.remove("active"));

        link.classList.add("active");
        document.getElementById(targetTab).classList.add("active");
      });
    });


    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const message = document.querySelector("#message").value;

      const data = {
        username: "📬 Novo Contato Recebido", 
        embeds: [
          {
            title: "**Mensagem Nova**", 
            description: `
**Nome:** ${name}
**E-mail:** ${email}

**Mensagem:**
> ${message}`,
            color: 0x2f3136, 
            footer: {
              text: "Formulário de Contato",
            },
            timestamp: new Date(),
          }
        ]
      };

      showNotification("Enviando sua mensagem...", false);

      fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => {

        if (response.ok) {

          showNotification("Mensagem Enviada com Sucesso!", false);
        } else {

          response.json().then(errorText => {
            console.error("Erro na resposta do webhook:", errorText);
            showNotification("Ocorreu um erro ao enviar a mensagem. Tente novamente.", true);
          });
        }
      })
      .catch(error => {
 
        console.error("Erro ao enviar a mensagem:", error);
        showNotification("Ocorreu um erro ao enviar a mensagem. Tente novamente.", true);
      });


      form.reset();
    });

    function showNotification(message, isError = false) {
      const notificationText = document.getElementById("notification-message");
      const notificationIcon = document.getElementById("notification-icon");
    
      notificationText.textContent = message;
    
      notification.classList.remove("notification-error", "notification-success");
    
      if (isError) {
        notification.classList.add("notification-error"); 
        notificationIcon.innerHTML = `
          <img src="assets/errado.png" alt="Erro" width="38" height="38">`;        
      } else {
        notification.classList.add("notification-success"); 
        notificationIcon.innerHTML = `
          <img src="assets/certo.png" alt="Sucesso" width="38" height="38">`; 
      }
    
      notification.classList.add("show");
    
      setTimeout(() => {

        notification.classList.remove("show");
      }, 4000);  
    }
  }
});
