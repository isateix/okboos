"use client";

import React from "react";
import Footer from "../../components/Footer";

export default function PoliticaPrivacidadePage() {
  return (
    <>
      {/* Conteúdo principal */}
      <div className="container mx-auto p-8 max-w-4xl bg-white shadow-lg rounded-lg my-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Política de Privacidade
        </h1>

        <section className="mb-8">
          <p className="text-gray-600 leading-relaxed mb-4">
            A sua privacidade é importante para nós. Esta Política de Privacidade descreve como a{" "}
            <span className="font-semibold text-orange-600">OkBoss</span> coleta, usa e
            protege as informações pessoais que você nos fornece ao utilizar o nosso
            site e serviços.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Podemos recolher informações como nome, e-mail, número de telefone e
            detalhes de transação quando faz compras ou entra em contacto connosco.
            Também podemos recolher informações sobre como utiliza o site, como páginas
            visitadas e tempo de navegação.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            As informações recolhidas são utilizadas para melhorar os nossos serviços,
            processar pedidos, responder a solicitações e enviar atualizações, sempre
            com o seu consentimento.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            A <span className="font-semibold text-orange-600">OkBoss</span> compromete-se
            a proteger os seus dados pessoais com medidas de segurança adequadas.
            Nenhum método digital é 100% seguro, mas tomamos precauções rigorosas para
            garantir a sua proteção.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Não partilhamos as suas informações com terceiros, exceto quando necessário
            para cumprir a lei ou melhorar os nossos serviços com parceiros de
            confiança.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Você tem o direito de aceder, corrigir ou eliminar os seus dados pessoais.
            Para exercer estes direitos, entre em contacto connosco através do e-mail:
            <br />
            <span className="font-semibold text-orange-600">
              geralokboos@gmail.com
            </span>
          </p>

          <p className="text-gray-600 leading-relaxed">
            Esta Política pode ser atualizada periodicamente. Recomendamos que a
            consulte regularmente para se manter informado sobre como protegemos os seus
            dados.
          </p>
        </section>
      </div>

      {/* Footer global */}
      <Footer />
    </>
  );
}
