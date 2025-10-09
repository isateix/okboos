import React from 'react';

export default function PoliticaPrivacidadePage() {
  return (
    <div className="container mx-auto p-8 max-w-4xl bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Política de Privacidade</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">1. Introdução</h2>
        <p className="text-gray-600 leading-relaxed">
          A sua privacidade é importante para nós. Esta Política de Privacidade descreve como [Nome da Sua Empresa/Site] coleta, usa e protege as informações pessoais que você nos fornece ao utilizar nosso site e serviços.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">2. Informações que Coletamos</h2>
        <p className="text-gray-600 leading-relaxed mb-2">
          Podemos coletar os seguintes tipos de informações:
        </p>
        <ul className="list-disc list-inside text-gray-600 ml-4 leading-relaxed">
          <li>**Informações de Identificação Pessoal:** Nome, endereço de e-mail, endereço postal, número de telefone, etc., que você nos fornece voluntariamente ao se registrar, fazer um pedido ou entrar em contato conosco.</li>
          <li>**Dados de Uso:** Informações sobre como você acessa e usa o site, incluindo seu endereço IP, tipo de navegador, páginas visitadas, tempo gasto no site e outros dados de diagnóstico.</li>
          <li>**Dados de Transação:** Detalhes sobre produtos ou serviços que você adquiriu de nós.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">3. Como Usamos Suas Informações</h2>
        <p className="text-gray-600 leading-relaxed mb-2">
          Utilizamos as informações coletadas para diversas finalidades, incluindo:
        </p>
        <ul className="list-disc list-inside text-gray-600 ml-4 leading-relaxed">
          <li>Fornecer e manter nosso serviço.</li>
          <li>Processar suas transações e gerenciar seus pedidos.</li>
          <li>Melhorar, personalizar e expandir nosso site e serviços.</li>
          <li>Comunicar-nos com você, incluindo o envio de atualizações e informações de marketing (com seu consentimento).</li>
          <li>Detectar, prevenir e resolver problemas técnicos.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">4. Compartilhamento de Informações</h2>
        <p className="text-gray-600 leading-relaxed mb-2">
          Não vendemos, trocamos ou alugamos suas informações de identificação pessoal a terceiros. Podemos compartilhar informações genéricas agregadas não vinculadas a qualquer informação de identificação pessoal sobre visitantes e usuários com nossos parceiros de negócios, afiliados confiáveis e anunciantes para os fins descritos acima.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Podemos divulgar suas informações pessoais se exigido por lei ou em resposta a solicitações válidas de autoridades públicas.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">5. Segurança dos Dados</h2>
        <p className="text-gray-600 leading-relaxed">
          Implementamos medidas de segurança razoáveis para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">6. Seus Direitos</h2>
        <p className="text-gray-600 leading-relaxed mb-2">
          Você tem o direito de:
        </p>
        <ul className="list-disc list-inside text-gray-600 ml-4 leading-relaxed">
          <li>Acessar e solicitar uma cópia de suas informações pessoais.</li>
          <li>Solicitar a correção de quaisquer informações imprecisas.</li>
          <li>Solicitar a exclusão de suas informações pessoais.</li>
          <li>Opor-se ao processamento de suas informações pessoais.</li>
        </ul>
        <p className="text-gray-600 leading-relaxed mt-2">
          Para exercer esses direitos, entre em contato conosco através dos canais fornecidos em nosso site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">7. Links para Outros Sites</h2>
        <p className="text-gray-600 leading-relaxed">
          Nosso site pode conter links para outros sites que não são operados por nós. Se você clicar em um link de terceiros, será direcionado para o site desse terceiro. Aconselhamos vivamente que reveja a Política de Privacidade de todos os sites que visitar.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">8. Alterações a Esta Política de Privacidade</h2>
        <p className="text-gray-600 leading-relaxed">
          Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página. Aconselhamos que reveja esta Política de Privacidade periodicamente para quaisquer alterações.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">9. Contato</h2>
        <p className="text-gray-600 leading-relaxed">
          Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:
        </p>
        <ul className="list-disc list-inside text-gray-600 ml-4 leading-relaxed">
          <li>Por e-mail: [Seu Email de Contato]</li>
          <li>Pelo formulário de contato em nosso site.</li>
        </ul>
      </section>
    </div>
  );
}
