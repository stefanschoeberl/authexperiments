package dev.ssch.auth.authexperiments

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
class GreetingController {

    @RequestMapping(method = [RequestMethod.GET], path = ["/greeting"], produces = ["text/plain"])
    fun greeting(token: JwtAuthenticationToken): String {
        val claims = token.token.claims
        return """
            ${claims.v("sub")}
            ${claims.v("name")}
            ${claims.v("preferred_username")}
            ${claims.v("given_name")}
            ${claims.v("family_name")}
            ${claims.v("email")}
        """.trimIndent()
    }

    fun <K, V> Map<K, V>.v(k: K): String {
        return "$k = ${this[k]}"
    }
}